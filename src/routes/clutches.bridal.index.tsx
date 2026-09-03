import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { clutchSubcategories, getProductsBySubcategory } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsBySubcategory("bridal");

export const Route = createFileRoute("/clutches/bridal/")({
  head: () =>
    pageHead({
      title: "Bridal Clutches | Clutches | Neha Lifestyle",
      description:
        "Browse bridal clutches at Neha Lifestyle. Filter by price, colour and availability to find the piece that suits the occasion.",
      path: "/clutches/bridal",
      breadcrumbs: [
        { name: "Clutches", path: "/clutches" },
        { name: "Bridal Clutches", path: "/clutches/bridal" },
      ],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Clutches Category"
      title="Bridal Clutches"
      intro="Explore the bridal clutches edit at Neha Lifestyle, made for occasion dressing and evenings out."
      breadcrumbs={[
        { label: "Clutches", to: "/clutches" },
        { label: "Bridal Clutches", to: "/clutches/bridal" },
      ]}
      products={PRODUCTS}
    >
      <SubcategoryCards
        heading="Other clutch categories"
        headingId="related-categories"
        items={clutchSubcategories.filter((s) => s.slug !== "bridal")}
      />
    </CategoryListingPage>
  );
}
