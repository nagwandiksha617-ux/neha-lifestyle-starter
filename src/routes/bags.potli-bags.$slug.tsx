import { createFileRoute } from "@tanstack/react-router";

import { ProductDetailPage } from "@/components/product/ProductDetailPage";
import { ProductNotFound } from "@/components/product/ProductNotFound";
import { useProductBySlug } from "@/hooks/useCatalog";
import { buildProductHead } from "@/lib/product-seo";

const SUBCATEGORY = "potli-bags";
const BASE_PATH = "/bags/potli-bags";
const PARENT_CRUMBS = [
    { label: "Bags", to: "/bags" },
    { label: "Potli Bags", to: BASE_PATH },
];

export const Route = createFileRoute("/bags/potli-bags/$slug")({
  head: ({ params }) =>
    buildProductHead({
      subcategory: SUBCATEGORY,
      slug: params.slug,
      basePath: BASE_PATH,
      parentCrumbs: PARENT_CRUMBS,
    }),
  component: ProductRoute,
});

function ProductRoute() {
  const { slug } = Route.useParams();
  const product = useProductBySlug(SUBCATEGORY, slug);

  if (!product) {
    return <ProductNotFound backTo={BASE_PATH} backLabel="Back to Potli Bags" />;
  }

  return (
    <ProductDetailPage
      product={product}
      breadcrumbs={[...PARENT_CRUMBS, { label: product.name, to: `${BASE_PATH}/${product.slug}` }]}
    />
  );
}
