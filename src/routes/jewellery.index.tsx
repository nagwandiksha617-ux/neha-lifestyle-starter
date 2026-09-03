import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { jewellerySubcategories } from "@/data/products";
import { useProductsByCategory } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

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
  const products = useProductsByCategory("jewellery");

  return (
    <CategoryListingPage
      eyebrow="Collection"
      title="Jewellery Collection"
      intro="Earrings, rings, necklaces, bracelets, sets, pendants and watches — finishing details with quiet presence."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }]}
      products={products}
    >
      <SubcategoryCards
        heading="Browse jewellery categories"
        headingId="jewellery-categories"
        items={jewellerySubcategories}
      />
    </CategoryListingPage>
  );
}
