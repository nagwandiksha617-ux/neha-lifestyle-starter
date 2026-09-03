/**
 * Centralised product catalog.
 *
 * Every entry below is an explicitly labelled DEMO placeholder used to build
 * and validate the shopping experience. No real-world product, price or claim
 * is asserted. To go live, replace this array with real records (or swap the
 * export for an API/database read) — no component changes are required.
 */

import type { LinkProps } from "@tanstack/react-router";

export type RoutePath = NonNullable<LinkProps["to"]>;

export type CategorySlug = "bags" | "clutches" | "jewellery";

export type Availability = "in-stock" | "out-of-stock" | "pre-order";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  /** Route-matching subcategory slug, e.g. "handbags". */
  subcategory: string;
  price: number;
  /** Discounted price when on offer. */
  salePrice?: number;
  currency: "INR";
  /** Real image URLs once available; empty array renders an elegant placeholder. */
  images: string[];
  shortDescription: string;
  description: string;
  material: string;
  dimensions: string;
  color: string;
  /** Demo rating value. Replace with aggregated review data. */
  rating: number;
  reviewCount: number;
  availability: Availability;
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
}

export interface Subcategory {
  name: string;
  slug: string;
  category: CategorySlug;
  /** Route path for this subcategory. */
  path: RoutePath;
  shortDescription: string;
}

export const categories: Array<{
  slug: CategorySlug;
  name: string;
  path: RoutePath;
}> = [
  { slug: "bags", name: "Bags", path: "/bags" },
  { slug: "clutches", name: "Clutches", path: "/clutches" },
  { slug: "jewellery", name: "Jewellery", path: "/jewellery" },
];

export const bagSubcategories: Subcategory[] = [
  {
    name: "Hand Bags",
    slug: "handbags",
    category: "bags",
    path: "/bags/handbags",
    shortDescription: "Structured, everyday silhouettes for work and city days.",
  },
  {
    name: "Gym Bags",
    slug: "gym-bags",
    category: "bags",
    path: "/bags/gym-bags",
    shortDescription: "Roomy, practical shapes for training and weekends.",
  },
  {
    name: "Travel Bags",
    slug: "travel-bags",
    category: "bags",
    path: "/bags/travel-bags",
    shortDescription: "Generous carryalls built for short trips and long journeys.",
  },
  {
    name: "Shoulder Bags",
    slug: "shoulder-bags",
    category: "bags",
    path: "/bags/shoulder-bags",
    shortDescription: "Easy, hands-free styles that move from day to evening.",
  },
  {
    name: "Party Bags",
    slug: "party-bags",
    category: "bags",
    path: "/bags/party-bags",
    shortDescription: "Compact, ornamental pieces made for celebrations.",
  },
  {
    name: "Potli Bags",
    slug: "potli-bags",
    category: "bags",
    path: "/bags/potli-bags",
    shortDescription: "Traditional drawstring shapes with a modern finish.",
  },
];

export const jewellerySubcategories: Subcategory[] = [
  {
    name: "Earrings",
    slug: "earrings",
    category: "jewellery",
    path: "/jewellery/earrings",
    shortDescription: "From quiet studs to statement drops.",
  },
  {
    name: "Rings",
    slug: "rings",
    category: "jewellery",
    path: "/jewellery/rings",
    shortDescription: "Slim bands and sculpted forms to stack or wear alone.",
  },
  {
    name: "Necklaces",
    slug: "necklaces",
    category: "jewellery",
    path: "/jewellery/necklaces",
    shortDescription: "Layerable chains and defined centrepieces.",
  },
  {
    name: "Bracelets",
    slug: "bracelets",
    category: "jewellery",
    path: "/jewellery/bracelets",
    shortDescription: "Cuffs and chains that finish a look.",
  },
  {
    name: "Jewellery Sets",
    slug: "jewellery-sets",
    category: "jewellery",
    path: "/jewellery/jewellery-sets",
    shortDescription: "Coordinated pieces designed to be worn together.",
  },
  {
    name: "Pendants",
    slug: "pendants",
    category: "jewellery",
    path: "/jewellery/pendants",
    shortDescription: "Single, meaningful details on fine chains.",
  },
  {
    name: "Watches",
    slug: "watches",
    category: "jewellery",
    path: "/jewellery/watches",
    shortDescription: "Refined dials that read as jewellery first.",
  },
];

export const clutchSubcategory: Subcategory = {
  name: "Clutches",
  slug: "clutches",
  category: "clutches",
  path: "/clutches",
  shortDescription: "Elegant statement pieces for evenings and celebrations.",
};

export const allSubcategories: Subcategory[] = [
  ...bagSubcategories,
  clutchSubcategory,
  ...jewellerySubcategories,
];

interface DemoSeed {
  subcategory: string;
  category: CategorySlug;
  label: string;
  count: number;
}

const seeds: DemoSeed[] = [
  { subcategory: "handbags", category: "bags", label: "Sample Handbag", count: 4 },
  { subcategory: "gym-bags", category: "bags", label: "Sample Gym Bag", count: 3 },
  { subcategory: "travel-bags", category: "bags", label: "Sample Travel Bag", count: 3 },
  { subcategory: "shoulder-bags", category: "bags", label: "Sample Shoulder Bag", count: 3 },
  { subcategory: "party-bags", category: "bags", label: "Sample Party Bag", count: 3 },
  { subcategory: "potli-bags", category: "bags", label: "Sample Potli Bag", count: 3 },
  { subcategory: "clutches", category: "clutches", label: "Sample Clutch", count: 4 },
  { subcategory: "earrings", category: "jewellery", label: "Sample Earrings", count: 4 },
  { subcategory: "rings", category: "jewellery", label: "Sample Ring", count: 3 },
  { subcategory: "necklaces", category: "jewellery", label: "Sample Necklace", count: 3 },
  { subcategory: "bracelets", category: "jewellery", label: "Sample Bracelet", count: 3 },
  { subcategory: "jewellery-sets", category: "jewellery", label: "Sample Jewellery Set", count: 3 },
  { subcategory: "pendants", category: "jewellery", label: "Sample Pendant", count: 3 },
  { subcategory: "watches", category: "jewellery", label: "Sample Watch", count: 3 },
];

const materials = ["Placeholder material", "Placeholder material", "Placeholder material"];
const colors = ["Onyx", "Champagne", "Ivory", "Burgundy"];

/**
 * Deterministic demo generation keeps the catalog realistic in shape (varied
 * prices, ratings, sale flags) while staying obviously non-real in content.
 */
function buildDemoProducts(): Product[] {
  const products: Product[] = [];
  let index = 0;

  for (const seed of seeds) {
    for (let i = 1; i <= seed.count; i += 1) {
      index += 1;
      const suffix = String(i).padStart(2, "0");
      const name = `${seed.label} ${suffix}`;
      const slug = `${seed.subcategory}-${suffix}`;
      const price = 1200 + ((index * 730) % 8800);
      const onSale = index % 3 === 0;
      const rating = Number((3.4 + ((index * 7) % 16) / 10).toFixed(1));

      products.push({
        id: `demo-${slug}`,
        name,
        slug,
        category: seed.category,
        subcategory: seed.subcategory,
        price,
        ...(onSale ? { salePrice: Math.round((price * 0.8) / 10) * 10 } : {}),
        currency: "INR",
        images: [],
        shortDescription: "Demo placeholder listing. Product details to be added.",
        description:
          "This is a demo placeholder used to build and test the shopping experience. Real product details, photography and specifications will replace it.",
        material: materials[index % materials.length]!,
        dimensions: "Dimensions to be added",
        color: colors[index % colors.length]!,
        rating,
        reviewCount: 0,
        availability: index % 11 === 0 ? "out-of-stock" : "in-stock",
        featured: index % 4 === 0,
        newArrival: index % 5 === 0,
        bestSeller: index % 6 === 0,
      });
    }
  }

  return products;
}

export const products: Product[] = buildDemoProducts();

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsBySubcategory(subcategory: string): Product[] {
  return products.filter((p) => p.subcategory === subcategory);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Effective price used for sorting, filtering and totals. */
export function effectivePrice(product: Product): number {
  return product.salePrice ?? product.price;
}

export function formatPrice(value: number, currency: Product["currency"] = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function subcategoryName(slug: string): string {
  return allSubcategories.find((s) => s.slug === slug)?.name ?? slug;
}
