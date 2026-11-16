import { CATALOG, ProductItem } from "@/data/catalog";
import { discountPercent } from "@/lib/currency";

export type Tone = "cobalt" | "acid" | "coral" | "ink" | "sky" | "clay" | "paper";

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface CategoryCard {
  label: string;
  href: string;
  image: string;
  tone: Tone;
  index: string;
  blurb: string;
  long?: boolean;
}

export interface BrandWorld {
  name: string;
  display: string;
  logo: string;
  href: string;
  tagline: string;
  blurb: string;
  tone: Tone;
  image: string;
  accent: string;
}

export interface Review {
  quote: string;
  name: string;
  role: string;
  product: string;
  rating: number;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Shop All", href: "/collections" },
  { label: "Cameras", href: "/collections?category=Action%20Cameras" },
  { label: "Audio", href: "/collections?category=Speakers" },
  { label: "Power", href: "/collections?category=Power%20Banks" },
  { label: "Charging", href: "/collections?category=Chargers" },
  { label: "Deals", href: "/collections?deals=true", badge: "HOT" },
];

export const BRANDS: BrandWorld[] = [
  {
    name: "Insta360",
    display: "INSTA360",
    logo: "/images/logo-insta360.png",
    href: "/collections?brand=Insta360",
    tagline: "Capture the impossible",
    blurb: "8K action cams and 360° creators' tools.",
    tone: "cobalt",
    image: "/images/insta360-x5.png",
    accent: "#DBFF57",
  },
  {
    name: "JBL",
    display: "JBL",
    logo: "/images/logo-jbl.png",
    href: "/collections?brand=JBL",
    tagline: "Original pro sound",
    blurb: "Portable speakers and headphones built to move.",
    tone: "coral",
    image: "/images/jbl-charge-6.png",
    accent: "#121310",
  },
  {
    name: "UGREEN",
    display: "UGREEN",
    logo: "/images/logo-ugreen.png",
    href: "/collections?brand=Ugreen",
    tagline: "Power everything",
    blurb: "GaN chargers, docks and everyday carry cables.",
    tone: "acid",
    image: "/images/ugreen-nexode-pro-300w.png",
    accent: "#2545F5",
  },
  {
    name: "Anker",
    display: "ANKER",
    logo: "/images/logo-anker.png",
    href: "/collections?brand=Anker",
    tagline: "Charge your world",
    blurb: "The power banks and chargers that never quit.",
    tone: "ink",
    image: "/images/anker-prime-26k-300w.png",
    accent: "#DBFF57",
  },
];

const countCategory = (...categories: string[]) =>
  CATALOG.filter((product) => categories.includes(product.category)).length;

export const CATEGORY_CARDS: CategoryCard[] = [
  {
    label: "Action Cameras",
    href: "/collections?category=Action%20Cameras",
    image: "/images/insta360-x5.png",
    tone: "cobalt",
    index: "01",
    blurb: "360°, 8K, go anywhere.",
    long: true,
  },
  {
    label: "Speakers",
    href: "/collections?category=Speakers",
    image: "/images/jbl-charge-6.png",
    tone: "coral",
    index: "02",
    blurb: "Sound that travels.",
  },
  {
    label: "Headphones & Earbuds",
    href: "/collections?category=Headphones",
    image: "/images/jbl-live-780nc.png",
    tone: "acid",
    index: "03",
    blurb: "Tune the world out.",
  },
  {
    label: "Power Banks",
    href: "/collections?category=Power%20Banks",
    image: "/images/anker-prime-26k-300w.png",
    tone: "ink",
    index: "04",
    blurb: "Never run on empty.",
  },
  {
    label: "Chargers",
    href: "/collections?category=Chargers",
    image: "/images/ugreen-nexode-100w.png",
    tone: "sky",
    index: "05",
    blurb: "One brick. Everything.",
  },
  {
    label: "Hubs & Docks",
    href: "/collections?category=Hubs%20%26%20Docks",
    image: "/images/ugreen-revodok-usb-c-hub.png",
    tone: "paper",
    index: "06",
    blurb: "More ports. Less mess.",
  },
];

export const CATEGORY_COUNTS: Record<string, number> = {
  "Action Cameras": countCategory("Action Cameras"),
  Speakers: countCategory("Speakers"),
  "Headphones & Earbuds": countCategory("Headphones", "Earbuds"),
  "Power Banks": countCategory("Power Banks"),
  Chargers: countCategory("Chargers"),
  "Hubs & Docks": countCategory("Hubs & Docks"),
};

const byId = (id: string): ProductItem => {
  const product = CATALOG.find((item) => item.id === id);
  if (!product) {
    return CATALOG[0];
  }
  return product;
};

export interface HeroSlide {
  headline: string;
  blurb: string;
  product: ProductItem;
  tone: "coral" | "cobalt" | "paper";
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    headline: "Made for more",
    blurb:
      "Flagship 8K 360° capture with a replaceable lens system and AI editing, delivered same day inside Kathmandu Valley.",
    product: byId("insta360-x5"),
    tone: "coral",
  },
  {
    headline: "Sound that moves",
    blurb:
      "Bold JBL Pro Sound in a waterproof body, with 12 hours of playtime and IP67 protection for long days out.",
    product: byId("jbl-flip-6"),
    tone: "paper",
  },
  {
    headline: "Power everything",
    blurb:
      "One 300W GaN desktop charger for laptops, tablets, phones and accessories. Eight ports, no clutter.",
    product: byId("ugreen-nexode-pro-300w"),
    tone: "cobalt",
  },
  {
    headline: "Charge ahead",
    blurb:
      "A 300W power bank that runs two laptops at full speed, with a smart display and app control.",
    product: byId("anker-prime-26k-300w"),
    tone: "coral",
  },
];

export const EDITORIAL_DROP = {
  lead: byId("jbl-charge-6"),
  sideTop: byId("insta360-x5"),
  sideBottom: byId("anker-maggo-10k-slim"),
};

export const DEAL_PRODUCTS: ProductItem[] = [...CATALOG]
  .filter((product) => discountPercent(product.price, product.originalPrice) > 0)
  .sort(
    (a, b) =>
      discountPercent(b.price, b.originalPrice) -
      discountPercent(a.price, a.originalPrice)
  )
  .slice(0, 8);

export const TRENDING_PRODUCTS: ProductItem[] = [...CATALOG]
  .sort((a, b) => b.reviewsCount - a.reviewsCount)
  .slice(0, 12);

export const NEW_ARRIVALS: ProductItem[] = [
  byId("insta360-x5"),
  byId("insta360-go-ultra"),
  byId("jbl-flip-7"),
  byId("jbl-charge-6"),
  byId("ugreen-nexode-pro-300w"),
  byId("ugreen-clipbuds-pro-2"),
  byId("anker-prime-26k-300w"),
  byId("anker-soundcore-space-one"),
];

export const TRUST_ITEMS = [
  {
    title: "Official warranty",
    text: "1-year manufacturer cover on every product.",
    icon: "shield",
  },
  {
    title: "Same-day delivery",
    text: "Inside Kathmandu Valley, before 3pm.",
    icon: "truck",
  },
  {
    title: "7-day returns",
    text: "Changed your mind? No drama.",
    icon: "refresh",
  },
  {
    title: "Real human support",
    text: "Sun–Fri, 10am–7pm. Ask us anything.",
    icon: "headset",
  },
] as const;

export const REVIEWS: Review[] = [
  {
    quote:
      "Ordered the Insta360 X5 at 11am and had it in my hands before dinner. Actual official stock, sealed box, proper warranty card.",
    name: "Anish R.",
    role: "Filmmaker, Lalitpur",
    product: "Insta360 X5",
    rating: 5,
  },
  {
    quote:
      "The team talked me out of the bigger speaker I was about to buy. The Flip 6 is perfect for my daily commute. That kind of advice is rare.",
    name: "Prakriti S.",
    role: "Product designer, Kathmandu",
    product: "JBL Flip 6",
    rating: 5,
  },
  {
    quote:
      "I've bought three UGREEN chargers from Cellucity now. Prices are honest, and the one time a cable failed they replaced it the same week.",
    name: "Kiran M.",
    role: "Software engineer, Baneshwor",
    product: "UGREEN Nexode 100W",
    rating: 5,
  },
];

export const SERVICE_NOTES = [
  "Official stock only",
  "Same-day Kathmandu delivery",
  "eSewa · Khalti · COD",
  "7-day easy returns",
  "Real human support",
];

export const CATEGORY_NAMES = [...new Set(CATALOG.map((product) => product.category))].sort();

export const PRICE_MAX_USD =
  Math.ceil(
    Math.max(...CATALOG.map((product) => product.originalPrice || product.price)) / 10
  ) * 10;

export function productsForBrand(brand: string): ProductItem[] {
  return CATALOG.filter(
    (product) => product.brand.toLowerCase() === brand.toLowerCase()
  );
}
