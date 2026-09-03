import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { jewellerySubcategories } from "@/data/products";
import { useProductsBySubcategory } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/jewellery/earrings/")({
  head: () =>
    pageHead({
      title: "Earrings | Jewellery | Neha Lifestyle",
      description:
        "Browse earrings at Neha Lifestyle. Filter by price, availability and rating to find the piece that suits you.",
      path: "/jewellery/earrings",
      breadcrumbs: [{ name: "Jewellery", path: "/jewellery" }, { name: "Earrings", path: "/jewellery/earrings" }],
    }),
  component: Page,
});

function Page() {
  const products = useProductsBySubcategory("earrings");

  return (
    <CategoryListingPage
      eyebrow="Jewellery Category"
      title="Earrings"
      intro="Explore the earrings edit at Neha Lifestyle, refined for everyday wear and occasion dressing alike."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }, { label: "Earrings", to: "/jewellery/earrings" }]}
      products={products}
    >
      <SubcategoryCards
        heading="Other jewellery categories"
        headingId="related-categories"
        items={jewellerySubcategories.filter((s) => s.slug !== "earrings")}
      />
    </CategoryListingPage>
  );
}
