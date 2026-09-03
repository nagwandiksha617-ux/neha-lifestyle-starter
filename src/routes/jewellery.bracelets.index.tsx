import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { jewellerySubcategories } from "@/data/products";
import { useProductsBySubcategory } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/jewellery/bracelets/")({
  head: () =>
    pageHead({
      title: "Bracelets | Jewellery | Neha Lifestyle",
      description:
        "Browse bracelets at Neha Lifestyle. Filter by price, availability and rating to find the piece that suits you.",
      path: "/jewellery/bracelets",
      breadcrumbs: [{ name: "Jewellery", path: "/jewellery" }, { name: "Bracelets", path: "/jewellery/bracelets" }],
    }),
  component: Page,
});

function Page() {
  const products = useProductsBySubcategory("bracelets");

  return (
    <CategoryListingPage
      eyebrow="Jewellery Category"
      title="Bracelets"
      intro="Explore the bracelets edit at Neha Lifestyle, refined for everyday wear and occasion dressing alike."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }, { label: "Bracelets", to: "/jewellery/bracelets" }]}
      products={products}
    >
      <SubcategoryCards
        heading="Other jewellery categories"
        headingId="related-categories"
        items={jewellerySubcategories.filter((s) => s.slug !== "bracelets")}
      />
    </CategoryListingPage>
  );
}
