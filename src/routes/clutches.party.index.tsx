import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { clutchSubcategories, getProductsBySubcategory } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsBySubcategory("party");

export const Route = createFileRoute("/clutches/party/")({
  head: () =>
    pageHead({
      title: "Party Clutches | Clutches | Neha Lifestyle",
      description:
        "Browse party clutches at Neha Lifestyle. Filter by price, colour and availability to find the piece that suits the occasion.",
      path: "/clutches/party",
      breadcrumbs: [
        { name: "Clutches", path: "/clutches" },
        { name: "Party Clutches", path: "/clutches/party" },
      ],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Clutches Category"
      title="Party Clutches"
      intro="Explore the party clutches edit at Neha Lifestyle, made for occasion dressing and evenings out."
      breadcrumbs={[
        { label: "Clutches", to: "/clutches" },
        { label: "Party Clutches", to: "/clutches/party" },
      ]}
      products={PRODUCTS}
    >
      <SubcategoryCards
        heading="Other clutch categories"
        headingId="related-categories"
        items={clutchSubcategories.filter((s) => s.slug !== "party")}
      />
    </CategoryListingPage>
  );
}
