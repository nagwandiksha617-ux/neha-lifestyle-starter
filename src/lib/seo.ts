/**
 * Page-level SEO architecture.
 *
 * Every route builds its head through `pageHead()` so titles, descriptions,
 * canonicals, Open Graph, Twitter/X and robots directives stay unique and
 * consistent. No social profiles, contact details or addresses are invented —
 * only facts that exist in this project are emitted.
 */

export const SITE_NAME = "Neha Lifestyle";

/** Sitewide fallback copy — deliberately different from the homepage's own. */
export const SITE_FALLBACK_DESCRIPTION =
  "Neha Lifestyle is a premium destination for bags, clutches and jewellery designed to elevate your everyday style.";

export interface BreadcrumbItem {
  name: string;
  /** Root-relative path, e.g. "/bags". */
  path: string;
}

export interface PageSeoInput {
  /** Full <title> for the page. Used verbatim. */
  title: string;
  description: string;
  /** Root-relative path of this page, e.g. "/bags/handbags". */
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  /**
   * Absolute https URL of an image the page actually shows.
   * Omit when the page has no meaningful image — a placeholder previews worse
   * than no tag at all.
   */
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  /** e.g. "noindex, follow". Omitted entirely when not set. */
  robots?: string;
  /** Breadcrumb trail; "Home" is prepended automatically. */
  breadcrumbs?: BreadcrumbItem[];
  /** Extra JSON-LD blocks to inject for this route. */
  jsonLd?: Array<Record<string, unknown>>;
}

/**
 * The deployment origin is not known at build time, so canonical and og:url
 * stay root-relative. Crawlers resolve them against the serving host.
 */
function normalizePath(path: string): string {
  if (!path.startsWith("/")) return `/${path}`;
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

export function organizationSchema(): Record<string, unknown> {
  // Only the name is asserted; no logo URL, contact points, addresses or
  // sameAs profiles exist as verified facts yet.
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description: SITE_FALLBACK_DESCRIPTION,
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_FALLBACK_DESCRIPTION,
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: normalizePath(item.path),
    })),
  };
}

export interface ProductSchemaInput {
  name: string;
  description: string;
  /** Root-relative or absolute product URL. */
  url: string;
  images?: string[];
  sku?: string;
  brand?: string;
  offer?: { price: string; priceCurrency: string; availability?: string };
}

/**
 * Helper reserved for when real products exist. It is intentionally NOT called
 * anywhere yet — no product schema should be emitted for placeholder catalog
 * slots.
 */
export function productSchema(input: ProductSchemaInput): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    url: normalizePath(input.url),
    brand: { "@type": "Brand", name: input.brand ?? SITE_NAME },
  };
  if (input.images?.length) schema.image = input.images;
  if (input.sku) schema.sku = input.sku;
  if (input.offer) {
    schema.offers = {
      "@type": "Offer",
      price: input.offer.price,
      priceCurrency: input.offer.priceCurrency,
      availability: input.offer.availability ?? "https://schema.org/InStock",
      url: normalizePath(input.url),
    };
  }
  return schema;
}

type MetaEntry = Record<string, string>;

/** Builds the `head()` return value for a route. */
export function pageHead(input: PageSeoInput) {
  const path = normalizePath(input.path);
  const ogTitle = input.ogTitle ?? input.title;
  const ogDescription = input.ogDescription ?? input.description;

  const meta: MetaEntry[] = [
    { title: input.title },
    { name: "description", content: input.description },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: ogTitle },
    { property: "og:description", content: ogDescription },
    { property: "og:type", content: input.ogType ?? "website" },
    { property: "og:url", content: path },
    { name: "twitter:card", content: input.twitterCard ?? "summary" },
    { name: "twitter:title", content: ogTitle },
    { name: "twitter:description", content: ogDescription },
  ];

  if (input.ogImage) {
    meta.push({ property: "og:image", content: input.ogImage });
    meta.push({ name: "twitter:image", content: input.ogImage });
  }
  if (input.robots) {
    meta.push({ name: "robots", content: input.robots });
  }

  const breadcrumbs = input.breadcrumbs?.length
    ? [{ name: "Home", path: "/" }, ...input.breadcrumbs]
    : undefined;

  const schemas: Array<Record<string, unknown>> = [
    ...(breadcrumbs ? [breadcrumbSchema(breadcrumbs)] : []),
    ...(input.jsonLd ?? []),
  ];

  return {
    meta,
    links: [{ rel: "canonical", href: path }],
    scripts: schemas.map((schema) => ({
      type: "application/ld+json",
      children: JSON.stringify(schema),
    })),
  };
}
