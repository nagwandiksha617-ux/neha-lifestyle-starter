import { getProductBySlug, subcategoryName } from "@/data/products";
import { SITE_NAME, breadcrumbSchema, pageHead } from "@/lib/seo";

interface ProductHeadInput {
  subcategory: string;
  slug: string;
  basePath: string;
  parentCrumbs: Array<{ label: string; to: string }>;
}

/**
 * Route-specific head metadata for a product page.
 *
 * Structured data intentionally omits offers, ratings and availability: the
 * catalogue currently holds placeholder values only, and publishing them as
 * schema.org facts would be misleading.
 */
export function buildProductHead({ subcategory, slug, basePath, parentCrumbs }: ProductHeadInput) {
  const product = getProductBySlug(subcategory, slug);
  const path = `${basePath}/${slug}`;

  if (!product) {
    return pageHead({
      title: `Product not found | ${SITE_NAME}`,
      description: "This product page is unavailable. Explore the Neha Lifestyle collection.",
      path,
      robots: "noindex, follow",
    });
  }

  const categoryLabel = subcategoryName(product.subcategory);
  const title = `${product.name} | ${categoryLabel} | ${SITE_NAME}`;
  const description = `${product.name} from the ${categoryLabel} collection at ${SITE_NAME}. ${product.shortDescription}`;

  const crumbs = [
    { name: "Home", path: "/" },
    ...parentCrumbs.map((c) => ({ name: c.label, path: c.to })),
    { name: product.name, path },
  ];

  const productSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: path,
    category: categoryLabel,
    brand: { "@type": "Brand", name: SITE_NAME },
  };
  if (product.images.length > 0) productSchema["image"] = product.images;

  const head = pageHead({
    title,
    description,
    path,
    ogType: "product",
    ...(product.images[0] && product.images[0].startsWith("https://")
      ? { ogImage: product.images[0], twitterCard: "summary_large_image" as const }
      : {}),
    jsonLd: [breadcrumbSchema(crumbs), productSchema],
  });

  return head;
}
