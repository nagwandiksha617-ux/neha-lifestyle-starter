import {
  categoryName,
  effectivePrice,
  getProductBySlug,
  productPath,
  subcategoryName,
  type Product,
} from "@/data/products";
import { SITE_NAME, breadcrumbSchema, pageHead } from "@/lib/seo";

interface ProductHeadInput {
  subcategory: string;
  slug: string;
  basePath: string;
  parentCrumbs: Array<{ label: string; to: string }>;
}

const schemaAvailability: Record<Product["stockStatus"], string> = {
  "in-stock": "https://schema.org/InStock",
  "out-of-stock": "https://schema.org/OutOfStock",
  "pre-order": "https://schema.org/PreOrder",
  "made-to-order": "https://schema.org/MadeToOrder",
};

/**
 * Route-specific head metadata for a product page.
 *
 * Title, description, canonical, Open Graph and structured data are all
 * derived from the catalog record, with per-product overrides (`seoTitle`,
 * `seoDescription`, `seoKeywords`, `canonicalUrl`) honoured when present.
 *
 * Structured data only ever emits facts the record actually holds: offers
 * appear only when a price exists, availability only alongside an offer, and
 * ratings only when there is genuine review data. Nothing is fabricated.
 */
export function buildProductHead({ subcategory, slug, basePath, parentCrumbs }: ProductHeadInput) {
  const product = getProductBySlug(subcategory, slug);
  const path = product ? productPath(product) : `${basePath}/${slug}`;

  if (!product) {
    return pageHead({
      title: `Product not found | ${SITE_NAME}`,
      description: "This product page is unavailable. Explore the Neha Lifestyle collection.",
      path,
      robots: "noindex, follow",
    });
  }

  const categoryLabel = subcategoryName(product.subcategory);
  const title = product.seoTitle ?? `${product.name} | ${categoryLabel} | ${SITE_NAME}`;
  const description =
    product.seoDescription ??
    [
      `${product.name} from the ${categoryLabel} collection at ${SITE_NAME}.`,
      product.shortDescription ?? "",
    ]
      .join(" ")
      .trim();

  const crumbs = [
    { name: "Home", path: "/" },
    ...parentCrumbs.map((c) => ({ name: c.label, path: c.to })),
    { name: product.name, path },
  ];

  const productSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    url: path,
    category: `${categoryName(product.category)} / ${categoryLabel}`,
    brand: { "@type": "Brand", name: SITE_NAME },
  };
  if (product.description) productSchema["description"] = product.description;
  if (product.images.length > 0) productSchema["image"] = product.images;
  if (product.sku) productSchema["sku"] = product.sku;
  if (product.color) productSchema["color"] = product.color;
  if (product.material) productSchema["material"] = product.material;
  if (product.weight) productSchema["weight"] = product.weight;
  if (product.size) productSchema["size"] = product.size;

  const price = effectivePrice(product);
  if (price != null) {
    productSchema["offers"] = {
      "@type": "Offer",
      price: String(price),
      priceCurrency: product.currency,
      availability: schemaAvailability[product.stockStatus],
      url: path,
    };
  }
  if (product.rating != null && (product.reviewCount ?? 0) > 0) {
    productSchema["aggregateRating"] = {
      "@type": "AggregateRating",
      ratingValue: String(product.rating),
      reviewCount: String(product.reviewCount),
    };
  }

  const primaryImage = product.images[0];

  return pageHead({
    title,
    description,
    path: product.canonicalUrl ?? path,
    ogType: "product",
    ...(product.seoKeywords?.length ? { keywords: product.seoKeywords } : {}),
    ...(primaryImage && primaryImage.startsWith("https://")
      ? { ogImage: primaryImage, twitterCard: "summary_large_image" as const }
      : {}),
    jsonLd: [breadcrumbSchema(crumbs), productSchema],
  });
}
