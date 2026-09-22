/**
 * Catalog taxonomy — the single source of truth for categories, subcategories
 * and their routes. Adding a subcategory here plus its two route files is the
 * only change required for it to appear in navigation, listings, filters,
 * breadcrumbs, related products and the sitemap.
 */

import type { CategorySlug, RoutePath, Subcategory } from "./types";

export const categories: Array<{
  slug: CategorySlug;
  name: string;
  path: RoutePath;
}> = [
  { slug: "bags", name: "Bags", path: "/bags" },
  { slug: "clutches", name: "Clutches", path: "/clutches" },
  { slug: "jewellery", name: "Jewellery", path: "/jewellery" },
  { slug: "travel-bags", name: "Travel Bags", path: "/travel-bags" },
];

export const bagSubcategories: Subcategory[] = [
  {
    name: "Hand Bags",
    slug: "handbags",
    category: "bags",
    path: "/bags/handbags",
    productPattern: "/bags/handbags/$slug",
    shortDescription: "Structured, everyday silhouettes for work and city days.",
  },
  {
    name: "Shoulder Bags",
    slug: "shoulder-bags",
    category: "bags",
    path: "/bags/shoulder-bags",
    productPattern: "/bags/shoulder-bags/$slug",
    shortDescription: "Easy, hands-free styles that move from day to evening.",
  },
  {
    name: "Gym Bags",
    slug: "gym-bags",
    category: "bags",
    path: "/bags/gym-bags",
    productPattern: "/bags/gym-bags/$slug",
    shortDescription: "Roomy, practical shapes for training and weekends.",
  },
  {
    name: "Party Bags",
    slug: "party-bags",
    category: "bags",
    path: "/bags/party-bags",
    productPattern: "/bags/party-bags/$slug",
    shortDescription: "Compact, ornamental pieces made for celebrations.",
  },
  {
    name: "Potli Bags",
    slug: "potli-bags",
    category: "bags",
    path: "/bags/potli-bags",
    productPattern: "/bags/potli-bags/$slug",
    shortDescription: "Traditional drawstring shapes with a modern finish.",
  },
];

/** Extensible: add an entry plus its two route files to publish a new edit. */
export const clutchSubcategories: Subcategory[] = [
  {
    name: "Bridal Clutches",
    slug: "bridal",
    category: "clutches",
    path: "/clutches/bridal",
    productPattern: "/clutches/bridal/$slug",
    shortDescription: "Ceremonial pieces for the wedding day and every event around it.",
  },
  {
    name: "Party Clutches",
    slug: "party",
    category: "clutches",
    path: "/clutches/party",
    productPattern: "/clutches/party/$slug",
    shortDescription: "Evening shapes for dinners, receptions and celebrations.",
  },
  {
    name: "Designer Clutches",
    slug: "designer",
    category: "clutches",
    path: "/clutches/designer",
    productPattern: "/clutches/designer/$slug",
    shortDescription: "Considered, detail-led statements for occasion dressing.",
  },
  {
    name: "Potli Clutches",
    slug: "potli",
    category: "clutches",
    path: "/clutches/potli",
    productPattern: "/clutches/potli/$slug",
    shortDescription: "Drawstring silhouettes rooted in traditional craft.",
  },
];

/** Extensible: add an entry plus its two route files to publish a new edit. */
export const jewellerySubcategories: Subcategory[] = [
  {
    name: "Earrings",
    slug: "earrings",
    category: "jewellery",
    path: "/jewellery/earrings",
    productPattern: "/jewellery/earrings/$slug",
    shortDescription: "From quiet studs to statement drops.",
  },
  {
    name: "Rings",
    slug: "rings",
    category: "jewellery",
    path: "/jewellery/rings",
    productPattern: "/jewellery/rings/$slug",
    shortDescription: "Slim bands and sculpted forms to stack or wear alone.",
  },
  {
    name: "Necklaces",
    slug: "necklaces",
    category: "jewellery",
    path: "/jewellery/necklaces",
    productPattern: "/jewellery/necklaces/$slug",
    shortDescription: "Layerable chains and defined centrepieces.",
  },
  {
    name: "Bracelets",
    slug: "bracelets",
    category: "jewellery",
    path: "/jewellery/bracelets",
    productPattern: "/jewellery/bracelets/$slug",
    shortDescription: "Cuffs and chains that finish a look.",
  },
  {
    name: "Jewellery Sets",
    slug: "jewellery-sets",
    category: "jewellery",
    path: "/jewellery/jewellery-sets",
    productPattern: "/jewellery/jewellery-sets/$slug",
    shortDescription: "Coordinated pieces designed to be worn together.",
  },
  {
    name: "Pendants",
    slug: "pendants",
    category: "jewellery",
    path: "/jewellery/pendants",
    productPattern: "/jewellery/pendants/$slug",
    shortDescription: "Single, meaningful details on fine chains.",
  },
  {
    name: "Watches",
    slug: "watches",
    category: "jewellery",
    path: "/jewellery/watches",
    productPattern: "/jewellery/watches/$slug",
    shortDescription: "Refined dials that read as jewellery first.",
  },
];

/** Travel Bags is its own main category — never a shelf inside Bags. */
export const travelBagSubcategories: Subcategory[] = [
  {
    name: "Travel Bags",
    slug: "travel-bags",
    category: "travel-bags",
    path: "/travel-bags/travel-bags",
    productPattern: "/travel-bags/travel-bags/$slug",
    shortDescription: "Everyday travel shapes for short journeys and weekends.",
  },
  {
    name: "Large Travel Bags",
    slug: "large-travel-bags",
    category: "travel-bags",
    path: "/travel-bags/large-travel-bags",
    productPattern: "/travel-bags/large-travel-bags/$slug",
    shortDescription: "Generous carryalls for longer trips.",
  },
  {
    name: "Wheeled & Trolley Travel Bags",
    slug: "trolley-travel-bags",
    category: "travel-bags",
    path: "/travel-bags/trolley-travel-bags",
    productPattern: "/travel-bags/trolley-travel-bags/$slug",
    shortDescription: "Wheeled bags with trolley handles for easy transit.",
  },
  {
    name: "Travel Backpacks",
    slug: "travel-backpacks",
    category: "travel-bags",
    path: "/travel-bags/travel-backpacks",
    productPattern: "/travel-bags/travel-backpacks/$slug",
    shortDescription: "Hands-free backpacks built for travel and commuting.",
  },
  {
    name: "Gym Bags",
    slug: "travel-gym-bags",
    category: "travel-bags",
    path: "/travel-bags/gym-bags",
    productPattern: "/travel-bags/gym-bags/$slug",
    shortDescription: "Practical shapes for training and weekends.",
  },
  {
    name: "Duffel Bags",
    slug: "duffel-bags",
    category: "travel-bags",
    path: "/travel-bags/duffel-bags",
    productPattern: "/travel-bags/duffel-bags/$slug",
    shortDescription: "Soft, roomy duffels for the gym and short trips.",
  },
  {
    name: "Sling & Crossbody Travel Bags",
    slug: "sling-crossbody-bags",
    category: "travel-bags",
    path: "/travel-bags/sling-crossbody-bags",
    productPattern: "/travel-bags/sling-crossbody-bags/$slug",
    shortDescription: "Light, close-to-body bags for essentials on the move.",
  },
];

export const allSubcategories: Subcategory[] = [
  ...bagSubcategories,
  ...clutchSubcategories,
  ...jewellerySubcategories,
  ...travelBagSubcategories,
];

export function subcategoriesOf(category: CategorySlug): Subcategory[] {
  return allSubcategories.filter((s) => s.category === category);
}

export function findSubcategory(slug: string): Subcategory | undefined {
  return allSubcategories.find((s) => s.slug === slug);
}

export function subcategoryName(slug: string): string {
  return findSubcategory(slug)?.name ?? slug.replace(/-/g, " ");
}

export function categoryName(slug: CategorySlug): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

export function categoryPath(slug: CategorySlug): RoutePath {
  return categories.find((c) => c.slug === slug)?.path ?? "/shop";
}
