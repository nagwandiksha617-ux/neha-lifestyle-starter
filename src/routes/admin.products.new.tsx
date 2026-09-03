import { createFileRoute } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { useAdminCatalog } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/admin/products/new")({
  head: () =>
    pageHead({
      title: "Add Product | Catalog Manager | Neha Lifestyle",
      description: "Add a product to the Neha Lifestyle catalog.",
      path: "/admin/products/new",
      robots: "noindex, nofollow",
    }),
  component: NewProductPage,
});

function NewProductPage() {
  const { products } = useAdminCatalog();
  return (
    <AdminShell title="Add Product">
      <ProductForm existing={products} heading="New product" />
    </AdminShell>
  );
}
