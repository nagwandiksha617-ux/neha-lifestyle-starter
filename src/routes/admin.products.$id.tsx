import { createFileRoute, Link } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { useAdminCatalog } from "@/hooks/useCatalog";
import { formFromProduct } from "@/data/catalog/admin-form";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/admin/products/$id")({
  head: () =>
    pageHead({
      title: "Edit Product | Catalog Manager | Neha Lifestyle",
      description: "Edit a product in the Neha Lifestyle catalog.",
      path: "/admin/products",
      robots: "noindex, nofollow",
    }),
  component: EditProductPage,
});

function EditProductPage() {
  const { id } = Route.useParams();
  const { products, hydrated } = useAdminCatalog();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <AdminShell title="Edit Product">
        <p className="text-[0.85rem] font-light text-muted-foreground">
          {hydrated
            ? "That product no longer exists in this browser's catalog."
            : "Loading this product…"}
        </p>
        <Link
          to="/admin"
          className="inline-flex w-fit border border-gold/25 px-8 py-3 text-[0.6rem] font-light tracking-[0.26em] text-ivory uppercase transition-colors hover:border-gold hover:text-gold"
        >
          Back to catalog
        </Link>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Edit Product">
      <ProductForm
        key={product.id}
        initial={formFromProduct(product)}
        existing={products}
        heading={product.name}
      />
    </AdminShell>
  );
}
