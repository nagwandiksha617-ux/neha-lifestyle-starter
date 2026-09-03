import { createFileRoute, Link } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { CatalogTable } from "@/components/admin/CatalogTable";
import { CsvPanel } from "@/components/admin/CsvPanel";
import { useAdminCatalog } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/admin/")({
  head: () =>
    pageHead({
      title: "Catalog Manager | Neha Lifestyle",
      description: "Add, edit and publish Neha Lifestyle products.",
      path: "/admin",
      robots: "noindex, nofollow",
    }),
  component: AdminHome,
});

function AdminHome() {
  const { products, rows } = useAdminCatalog();
  const published = products.filter((p) => p.status === "published").length;

  return (
    <AdminShell
      title="Catalog Manager"
      intro="Add your products once here and they appear across the shop, category pages, search, collections and product pages automatically."
      action={
        <Link
          to="/admin/products/new"
          className="inline-flex border border-gold bg-gold px-8 py-3 text-[0.6rem] font-light tracking-[0.26em] text-primary-foreground uppercase transition-colors hover:bg-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          Add product
        </Link>
      }
    >
      <dl className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Products", value: products.length },
          { label: "Published", value: published },
          { label: "Drafts", value: products.length - published },
        ].map((stat) => (
          <div key={stat.label} className="border border-gold/15 px-5 py-6">
            <dt className="text-[0.55rem] font-light tracking-[0.26em] text-muted-foreground uppercase">
              {stat.label}
            </dt>
            <dd className="mt-2 font-display text-3xl font-light text-ivory">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <CatalogTable products={products} />
      <CsvPanel products={products} rows={rows} />
    </AdminShell>
  );
}
