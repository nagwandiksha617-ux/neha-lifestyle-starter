import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { clutchSubcategories, getProductsBySubcategory } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsBySubcategory("designer");

export const Route = createFileRoute("/clutches/designer/")({
  head: () =>
    pageHead({
      title: "Designer Clutches | Clutches | Neha Lifestyle",
      description:
        "Browse designer clutches at Neha Lifestyle. Filter by price, colour and availability to find the piece that suits the occasion.",
      path: "/clutches/designer",
      breadcrumbs: [
        { name: "Clutches", path: "/clutches" },
        { name: "Designer Clutches", path: "/clutches/designer" },
      ],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Clutches Category"
      title="Designer Clutches"
      intro="Explore the designer clutches edit at Neha Lifestyle, made for occasion dressing and evenings out."
      breadcrumbs={[
        { label: "Clutches", to: "/clutches" },
        { label: "Designer Clutches", to: "/clutches/designer" },
      ]}
      products={PRODUCTS}
    >
      <SubcategoryCards
        heading="Other clutch categories"
        headingId="related-categories"
        items={clutchSubcategories.filter((s) => s.slug !== "designer")}
      />
    </CategoryListingPage>
  );
}
