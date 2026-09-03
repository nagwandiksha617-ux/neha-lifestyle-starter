/**
 * Product image delivery.
 *
 * Product photos live in a private storage bucket, so the storefront reads
 * them through this route. It streams a single stored object by path; it does
 * not list the bucket and it exposes no catalog data.
 */

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/product-image/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = (params as { _splat?: string })._splat ?? "";
        if (!path || path.includes("..")) return new Response("Not found", { status: 404 });

        const url = process.env['SUPABASE_URL'];
        const serviceKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];
        if (!url || !serviceKey) return new Response("Not available", { status: 503 });

        const { createClient } = await import("@supabase/supabase-js");
        const admin = createClient(url, serviceKey, {
          auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
        });

        const { data, error } = await admin.storage.from("product-images").download(path);
        if (error || !data) return new Response("Not found", { status: 404 });

        return new Response(data, {
          headers: {
            "Content-Type": data.type || "application/octet-stream",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
