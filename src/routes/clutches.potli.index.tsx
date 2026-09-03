import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { clutchSubcategories, getProductsBySubcategory } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsBySubcategory("potli");

export const Route = createFileRoute("/clutches/potli/")({
  head: () =>
    pageHead({
      title: "Potli Clutches | Clutches | Neha Lifestyle",
      description:
        "Browse potli clutches at Neha Lifestyle. Filter by price, colour and availability to find the piece that suits the occasion.",
      path: "/clutches/potli",
      breadcrumbs: [
        { name: "Clutches", path: "/clutches" },
        { name: "Potli Clutches", path: "/clutches/potli" },
      ],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Clutches Category"
      title="Potli Clutches"
      intro="Explore the potli clutches edit at Neha Lifestyle, made for occasion dressing and evenings out."
      breadcrumbs={[
        { label: "Clutches", to: "/clutches" },
        { label: "Potli Clutches", to: "/clutches/potli" },
      ]}
      products={PRODUCTS}
    >
      <SubcategoryCards
        heading="Other clutch categories"
        headingId="related-categories"
        items={clutchSubcategories.filter((s) => s.slug !== "potli")}
      />
    </CategoryListingPage>
  );
}
