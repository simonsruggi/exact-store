import type { Answer, Result, Sources, Storage } from './app.contract.d.ts';
import { categories, seeds, FREE_SHIPPING_CENTS, SHIPPING_CENTS, COD_FEE_CENTS } from './catalog.ts';

export const appId = 'com.simoneruggiero.exactstore';

// The demo keeps everything on the device, as next-store's demo mode keeps it in localStorage.
const FILE = 'app:/data/store.json';
export const grants = `fs.read ${FILE}\nfs.write ${FILE}`;

type Order = Result<'loadOrders'>[number];
type Kept = { orders: Order[]; inactive: string[] };

const load = (storage: Storage): Promise<Kept> => storage.fs.readFile(FILE).then(
  (bytes) => ({ orders: [], inactive: [], ...JSON.parse(new TextDecoder().decode(bytes)) }),
  (e) => { if (e.code === 'ENOENT') return { orders: [], inactive: [] }; throw e; });
const save = (storage: Storage, kept: Kept) =>
  storage.fs.atomicWriteFile(FILE, new TextEncoder().encode(JSON.stringify(kept)));

const products = (inactive: string[]) => seeds.map((p) => ({
  ...p,
  variants: p.variants ?? [],
  categoryName: categories.find((c) => c.id === p.categoryId)?.name ?? '',
  active: !inactive.includes(p.id),
}));

const ok = (id = '') => ({ ok: true, error: '', id });
const refuse = (error: string) => ({ ok: false, error, id: '' });

const sources: Sources = {
  loadCategories: () => categories,
  loadProducts: async (_args, _store, storage) => products((await load(storage)).inactive),

  loadOrders: async (_args, _store, storage) => (await load(storage)).orders,

  // A cart line is `productId|variantId|qty`; prices are read again here, never trusted from the view.
  placeOrder: async ([form, lines, at], _store, storage) => {
    const kept = await load(storage);
    const all = products(kept.inactive);
    const items = [];
    for (const line of lines) {
      const [pid, vid, q] = line.split('|');
      const p = all.find((x) => x.id === pid && x.active);
      if (!p) return refuse('A product in your cart is no longer available.');
      const v = p.variants.find((x) => x.id === vid);
      const quantity = Math.max(1, Math.round(Number(q) || 1));
      items.push({
        name: p.name + (v ? ` - ${v.name}` : ''),
        quantity,
        priceCents: v && v.priceCents > 0 ? v.priceCents : p.priceCents,
      });
    }
    if (items.length === 0) return refuse('Your cart is empty.');
    const subtotalCents = items.reduce((s, i) => s + i.priceCents * i.quantity, 0);
    const shippingCents = subtotalCents >= FREE_SHIPPING_CENTS ? 0 : SHIPPING_CENTS;
    const feeCents = form.payment === 'cod' ? COD_FEE_CENTS : 0;
    const order: Order = {
      id: `order-${Math.round(at)}`,
      number: `ORD-${String(kept.orders.length + 1).padStart(4, '0')}`,
      status: 'processing',
      paymentStatus: form.payment === 'cod' ? 'pending' : 'paid',
      paymentMethod: form.payment,
      email: form.email.trim(),
      name: form.name.trim(),
      address: `${form.address.trim()}, ${form.city.trim()} ${form.zip.trim()}`,
      phone: form.phone.trim(),
      items,
      subtotalCents,
      shippingCents,
      feeCents,
      totalCents: subtotalCents + shippingCents + feeCents,
      at,
    };
    await save(storage, { ...kept, orders: [order, ...kept.orders] });
    return ok(order.id);
  },

  setOrderStatus: async ([id, status], _store, storage) => {
    const kept = await load(storage);
    await save(storage, { ...kept, orders: kept.orders.map((o) => (o.id === id ? { ...o, status } : o)) });
    return ok(id);
  },

  setProductActive: async ([id, active], _store, storage) => {
    const kept = await load(storage);
    const inactive = active ? kept.inactive.filter((x) => x !== id) : [...new Set([...kept.inactive, id])];
    await save(storage, { ...kept, inactive });
    return ok(id);
  },
};

export const answer: Answer = (source, args, store, storage, native) =>
  sources[source](args, store, storage, native);
