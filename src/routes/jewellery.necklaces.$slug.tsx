import { createFileRoute } from "@tanstack/react-router";

import { ProductDetailPage } from "@/components/product/ProductDetailPage";
import { ProductNotFound } from "@/components/product/ProductNotFound";
import { getProductBySlug } from "@/data/products";
import { buildProductHead } from "@/lib/product-seo";

const SUBCATEGORY = "necklaces";
const BASE_PATH = "/jewellery/necklaces";
const PARENT_CRUMBS = [
    { label: "Jewellery", to: "/jewellery" },
    { label: "Necklaces", to: BASE_PATH },
];

export const Route = createFileRoute("/jewellery/necklaces/$slug")({
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
  const product = getProductBySlug(SUBCATEGORY, slug);

  if (!product) {
    return <ProductNotFound backTo={BASE_PATH} backLabel="Back to Necklaces" />;
  }

  return (
    <ProductDetailPage
      product={product}
      breadcrumbs={[...PARENT_CRUMBS, { label: product.name, to: `${BASE_PATH}/${product.slug}` }]}
    />
  );
}
