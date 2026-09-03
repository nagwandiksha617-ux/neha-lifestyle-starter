import { createFileRoute, Link } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { CatalogTable } from "@/components/admin/CatalogTable";
import { CsvPanel } from "@/components/admin/CsvPanel";
import { MigratePanel } from "@/components/admin/MigratePanel";
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
  const { products, rows, loading, error, hydrated } = useAdminCatalog();
  const published = products.filter((p) => p.status === "published").length;
  const lowStock = products.filter(
    (p) =>
      p.stockQuantity != null &&
      p.lowStockThreshold != null &&
      p.stockQuantity <= p.lowStockThreshold,
  ).length;

  const stats = [
    { label: "Products", value: products.length },
    { label: "Published", value: published },
    { label: "Drafts", value: products.length - published },
    { label: "Featured", value: products.filter((p) => p.featured).length },
    { label: "New arrivals", value: products.filter((p) => p.newArrival).length },
    { label: "Low stock", value: lowStock },
  ];

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
      {error && (
        <p
          role="alert"
          className="border border-destructive/40 bg-destructive/10 px-5 py-4 text-[0.78rem] font-light text-destructive"
        >
          The catalog could not be loaded just now. Check your connection and refresh the page.
        </p>
      )}

      {loading && !hydrated ? (
        <p className="text-[0.8rem] font-light tracking-[0.16em] text-muted-foreground uppercase">
          Loading your catalog…
        </p>
      ) : (
        <>
          <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((stat) => (
              <div key={stat.label} className="border border-gold/15 px-5 py-6">
                <dt className="text-[0.55rem] font-light tracking-[0.26em] text-muted-foreground uppercase">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-display text-3xl font-light text-ivory">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <MigratePanel />
          <CatalogTable products={products} />
          <CsvPanel products={products} rows={rows} />
        </>
      )}
    </AdminShell>
  );
}
