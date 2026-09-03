/**
 * Catalog source.
 *
 * This is the ONLY file to change when the real catalog arrives. Swap
 * `demoRecords` for the real records — or replace `loadCatalog()` with a
 * database / API / CSV read — and every card, detail page, listing, filter,
 * search result, related-products rail, SEO tag and sitemap URL follows
 * automatically.
 *
 * Setting `USE_DEMO_CATALOG` to false ships an empty catalog; every surface
 * has a designed empty state for that case.
 *
 * The demo records below are explicitly labelled placeholders. They assert no
 * real product name, price, image, specification, rating or review.
 */

import { normalizeCatalog, type ImportIssue } from "./normalize";
import type { Product, ProductInput } from "./types";

export const USE_DEMO_CATALOG = true;

interface DemoSeed {
  subcategory: string;
  category: string;
  label: string;
  count: number;
}

const seeds: DemoSeed[] = [
  { subcategory: "handbags", category: "bags", label: "Sample Handbag", count: 4 },
  { subcategory: "shoulder-bags", category: "bags", label: "Sample Shoulder Bag", count: 3 },
  { subcategory: "travel-bags", category: "bags", label: "Sample Travel Bag", count: 3 },
  { subcategory: "gym-bags", category: "bags", label: "Sample Gym Bag", count: 3 },
  { subcategory: "party-bags", category: "bags", label: "Sample Party Bag", count: 3 },
  { subcategory: "potli-bags", category: "bags", label: "Sample Potli Bag", count: 3 },
  { subcategory: "bridal", category: "clutches", label: "Sample Bridal Clutch", count: 3 },
  { subcategory: "party", category: "clutches", label: "Sample Party Clutch", count: 3 },
  { subcategory: "designer", category: "clutches", label: "Sample Designer Clutch", count: 3 },
  { subcategory: "potli", category: "clutches", label: "Sample Potli Clutch", count: 3 },
  { subcategory: "earrings", category: "jewellery", label: "Sample Earrings", count: 4 },
  { subcategory: "rings", category: "jewellery", label: "Sample Ring", count: 3 },
  { subcategory: "necklaces", category: "jewellery", label: "Sample Necklace", count: 3 },
  { subcategory: "bracelets", category: "jewellery", label: "Sample Bracelet", count: 3 },
  { subcategory: "jewellery-sets", category: "jewellery", label: "Sample Jewellery Set", count: 3 },
  { subcategory: "pendants", category: "jewellery", label: "Sample Pendant", count: 3 },
  { subcategory: "watches", category: "jewellery", label: "Sample Watch", count: 3 },
];

/**
 * Deterministic placeholder rows. Prices exist on most rows purely so the
 * cart, totals and checkout can be exercised end to end, and are labelled as
 * placeholders wherever they appear; every fourth row deliberately has no
 * price so the "price not configured" state stays covered. No ratings or
 * reviews are generated at all.
 */
function buildDemoRecords(): ProductInput[] {
  const rows: ProductInput[] = [];
  let index = 0;

  for (const seed of seeds) {
    for (let i = 1; i <= seed.count; i += 1) {
      index += 1;
      const suffix = String(i).padStart(2, "0");
      const slug = `${seed.subcategory}-${suffix}`;
      const priced = index % 4 !== 0;
      const price = 1200 + ((index * 730) % 8800);
      const onSale = priced && index % 3 === 0;

      rows.push({
        id: `demo-${slug}`,
        slug,
        productName: `${seed.label} ${suffix}`,
        category: seed.category,
        subcategory: seed.subcategory,
        shortDescription: "Demo placeholder listing. Product details to be added.",
        fullDescription:
          "This is a demo placeholder used to build and test the shopping experience. Real product details, photography and specifications will replace it.",
        ...(priced ? { price } : {}),
        ...(onSale ? { salePrice: Math.round((price * 0.8) / 10) * 10, compareAtPrice: price } : {}),
        stockStatus: index % 11 === 0 ? "out-of-stock" : "in-stock",
        images: [],
        tags: [seed.subcategory, seed.category],
        featured: index % 4 === 0,
        newArrival: index % 5 === 0,
        bestSeller: index % 6 === 0,
      });
    }
  }

  return rows;
}

/** Raw records currently powering the store. */
export const catalogRecords: ProductInput[] = USE_DEMO_CATALOG ? buildDemoRecords() : [];

const imported = normalizeCatalog(catalogRecords);

export const products: Product[] = imported.products;
/** Rows that could not be published, e.g. after a bad CSV import. */
export const catalogIssues: ImportIssue[] = imported.issues;
/** True while the store is running on labelled demo placeholders. */
export const isDemoCatalog = USE_DEMO_CATALOG;
