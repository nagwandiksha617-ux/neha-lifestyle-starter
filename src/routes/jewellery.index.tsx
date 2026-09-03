import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { getProductsByCategory, jewellerySubcategories } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsByCategory("jewellery");

export const Route = createFileRoute("/jewellery/")({
  head: () =>
    pageHead({
      title: "Jewellery | Neha Lifestyle",
      description:
        "Explore the Neha Lifestyle jewellery collection: earrings, rings, necklaces, bracelets, jewellery sets, pendants and watches.",
      path: "/jewellery",
      breadcrumbs: [{ name: "Jewellery", path: "/jewellery" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Collection"
      title="Jewellery Collection"
      intro="Earrings, rings, necklaces, bracelets, sets, pendants and watches — finishing details with quiet presence."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }]}
      products={PRODUCTS}
    >
      <SubcategoryCards
        heading="Browse jewellery categories"
        headingId="jewellery-categories"
        items={jewellerySubcategories}
      />
    </CategoryListingPage>
  );
}
