// The demo catalog of next-store (lib/mock-data.ts), with prices in cents.
const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=600`;

export const categories = [
  { id: 'cat-1', name: 'Electronics', slug: 'electronics' },
  { id: 'cat-2', name: 'Clothing', slug: 'clothing' },
  { id: 'cat-3', name: 'Home & Garden', slug: 'home-garden' },
  { id: 'cat-4', name: 'Digital', slug: 'digital' },
];

type Variant = { id: string; name: string; priceCents: number; stock: number };
type Seed = {
  id: string; name: string; slug: string; description: string; priceCents: number; compareCents: number;
  type: 'physical' | 'digital'; categoryId: string; sku: string; stock: number; featured: boolean;
  image: string; variants?: Variant[];
};

export const seeds: Seed[] = [
  { id: 'prod-1', name: 'Smartphone Pro Max', slug: 'smartphone-pro-max', description: 'Latest smartphone with advanced camera, fast processor and long battery life. 6.7 inch AMOLED display with 120Hz refresh rate. IP68 water resistant.', priceCents: 89999, compareCents: 99999, type: 'physical', categoryId: 'cat-1', sku: 'PHONE-001', stock: 50, featured: true, image: img('1511707171634-5f897ff02aa9') },
  { id: 'prod-2', name: 'Ultralight Laptop', slug: 'ultralight-laptop', description: 'Professional notebook with 14" 4K screen, 16GB RAM, 512GB SSD. Perfect for work and study. Up to 12 hours battery life.', priceCents: 129900, compareCents: 0, type: 'physical', categoryId: 'cat-1', sku: 'LAPTOP-001', stock: 25, featured: true, image: img('1496181133206-80ce9b88a853') },
  { id: 'prod-3', name: 'Wireless Headphones Premium', slug: 'wireless-headphones-premium', description: 'Over-ear headphones with active noise cancellation, Hi-Fi audio, 30 hours battery. Superior comfort for extended sessions.', priceCents: 24999, compareCents: 29999, type: 'physical', categoryId: 'cat-1', sku: 'AUDIO-001', stock: 100, featured: true, image: img('1505740420928-5e560c06d30e') },
  { id: 'prod-4', name: 'Basic T-Shirt', slug: 'basic-t-shirt', description: '100% organic cotton t-shirt, available in various colors. Regular fit, perfect for any occasion.', priceCents: 2999, compareCents: 0, type: 'physical', categoryId: 'cat-2', sku: 'TSHIRT-001', stock: 200, featured: false, image: img('1521572163474-6864f9cf17ab'),
    variants: [
      { id: 'var-1', name: 'White - S', priceCents: 0, stock: 30 },
      { id: 'var-2', name: 'White - M', priceCents: 0, stock: 40 },
      { id: 'var-3', name: 'Black - M', priceCents: 0, stock: 45 },
    ] },
  { id: 'prod-5', name: 'Slim Fit Jeans', slug: 'slim-fit-jeans', description: 'High quality denim jeans, modern slim fit cut. Medium wash, perfect for a casual yet polished look.', priceCents: 7999, compareCents: 9999, type: 'physical', categoryId: 'cat-2', sku: 'JEANS-001', stock: 80, featured: true, image: img('1542272604-787c3835535d') },
  { id: 'prod-6', name: 'Hoodie', slug: 'hoodie', description: 'Comfortable fleece cotton hoodie, perfect for cool days. Modern design with adjustable hood.', priceCents: 5999, compareCents: 0, type: 'physical', categoryId: 'cat-2', sku: 'HOODIE-001', stock: 120, featured: false, image: img('1556821840-3a63f95609a7') },
  { id: 'prod-7', name: 'Non-Stick Cookware Set', slug: 'non-stick-cookware-set', description: 'Complete set of 8 pots and pans with professional non-stick coating. Suitable for all cooktops.', priceCents: 14999, compareCents: 19999, type: 'physical', categoryId: 'cat-3', sku: 'KITCHEN-001', stock: 40, featured: true, image: img('1556909114-f6e7ad7d3136') },
  { id: 'prod-8', name: 'Smart LED Lamp', slug: 'smart-led-lamp', description: 'Smart desk lamp, app controlled, 16 million colors. Compatible with Alexa and Google Home.', priceCents: 4999, compareCents: 0, type: 'physical', categoryId: 'cat-3', sku: 'LAMP-001', stock: 75, featured: false, image: img('1507473885765-e6ed057f782c') },
  { id: 'prod-9', name: 'eBook: Digital Marketing Guide', slug: 'ebook-digital-marketing', description: 'Complete digital marketing handbook: SEO, social media, advertising and analytics. 300+ pages of practical content.', priceCents: 1999, compareCents: 2999, type: 'digital', categoryId: 'cat-4', sku: 'EBOOK-001', stock: 999, featured: true, image: img('1544947950-fa07a98d237f') },
  { id: 'prod-10', name: 'Video Course: Web Development', slug: 'course-web-development', description: 'Complete web development course: HTML, CSS, JavaScript, React. 50+ hours of video with practical projects.', priceCents: 9999, compareCents: 14999, type: 'digital', categoryId: 'cat-4', sku: 'CORSO-001', stock: 999, featured: true, image: img('1516321318423-f06f85e504b3') },
];

export const FREE_SHIPPING_CENTS = 5000;
export const SHIPPING_CENTS = 599;
export const COD_FEE_CENTS = 300;
