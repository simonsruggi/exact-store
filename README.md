# Exact Store

A demo e-commerce store written with [Exact](https://github.com/expo/exact), Expo's runtime that builds one
app for the web, iOS and macOS. It is a port of this repository's earlier Next.js version (tag
[`nextjs-version`](https://github.com/simonsruggi/exact-store/tree/nextjs-version)).

**[Live demo](https://exact-store.vercel.app)**

## Features

- **Shop**: product grid, search, category filter, sort by price or name
- **Product page**: variants, quantity, stock, compare-at price, deep links (`/product/<slug>`)
- **Cart**: quantities, remove, clear, free shipping from $50, kept on the device
- **Checkout**: contact and shipping form, credit card, PayPal or cash on delivery (+$3)
- **Orders**: order confirmation and history
- **Dashboard**: revenue, unpaid orders, order status, products switched on and off

This is a demo: no payment is taken and nothing ships. Orders and the cart stay in the browser.

## How it is built

| File | What it holds |
|---|---|
| `app.contract` | The screens: routes, state, actions and views, in Contract |
| `model.contract` | Records (`shape`s) and the cart and price arithmetic |
| `parts.contract` | Repeated pieces: product card, cart line, order row |
| `app.ts` | The data module: catalog, orders, status changes, kept in a file |
| `catalog.ts` | The demo catalog, prices in cents |
| `app.test.contract` | Tests that run unchanged on web, iOS and macOS |

Order totals are computed again in `app.ts` from the catalog, never taken from the screen.

## Run it

Exact has no npm package yet: an app uses a checkout of it by path.

```sh
git clone https://github.com/expo/exact.git ../../tools/exact   # or set EXACT2=<path>
bun ../../tools/exact/scripts/exact.mjs setup                   # once
bun exact.mjs web                                               # http://127.0.0.1:8765/
bun exact.mjs test web                                          # the tests
bun exact.mjs ios --run                                         # an iOS Simulator
```

## Deploy

The site is static. `bun run build` writes it to `dist/` with a `vercel.json` that serves the app's routes,
and `bun run deploy` publishes `dist/` to Vercel.

## Disclaimer

Product photos come from [Unsplash](https://unsplash.com). Product names and prices are made up. Not affiliated
with Expo or Vercel.

## License

MIT License

---

exact-store is free and open source. If you find it useful, please [⭐️ star the repo](https://github.com/simonsruggi/exact-store) — and if you'd like to support my open-source work, you can [💛 sponsor me on GitHub](https://github.com/sponsors/simonsruggi) or [☕️ buy me a coffee](https://buymeacoffee.com/simonsruggi). Completely optional, always appreciated. 🙏
