import { createFileRoute } from "@tanstack/react-router";

import { productPath, products } from "@/data/products";

/**
 * Public, indexable routes. Product detail URLs are appended from the catalog
 * data model. Policy shells are excluded because they are noindex until real
 * content is published.
 */
const publicPaths = [
  "/",
  "/shop",
  "/bags",
  "/bags/handbags",
  "/bags/gym-bags",
  "/bags/travel-bags",
  "/bags/shoulder-bags",
  "/bags/party-bags",
  "/bags/potli-bags",
  "/clutches",
  "/jewellery",
  "/jewellery/earrings",
  "/jewellery/rings",
  "/jewellery/necklaces",
  "/jewellery/bracelets",
  "/jewellery/jewellery-sets",
  "/jewellery/pendants",
  "/jewellery/watches",
  "/new-arrivals",
  "/best-sellers",
  "/about",
  "/contact",
  "/faq",
  "/blog",
] as const;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        // The deployment origin is not hardcoded; it is read from the request
        // so the sitemap stays correct on preview and production hosts.
        const url = new URL(request.url);
        const forwardedHost =
          url.hostname === "localhost" ? request.headers.get("x-forwarded-host") : null;
        const origin = forwardedHost ? `https://${forwardedHost}` : url.origin;

        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...publicPaths, ...products.map(productPath)].map((p) => `  <url><loc>${origin}${p === "/" ? "/" : p}</loc></url>`).join("\n")}
</urlset>
`;

        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
