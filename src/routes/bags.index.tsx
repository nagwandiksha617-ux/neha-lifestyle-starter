import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { bagSubcategories } from "@/data/products";
import { useProductsByCategory } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/bags/")({
  head: () =>
    pageHead({
      title: "Bags | Neha Lifestyle",
      description:
        "Explore the Neha Lifestyle bags collection: hand bags, gym bags, shoulder bags, party bags and potli bags.",
      path: "/bags",
      breadcrumbs: [{ name: "Bags", path: "/bags" }],
    }),
  component: Page,
});

function Page() {
  const products = useProductsByCategory("bags");
  const duffelBags = useProductsBySubcategory("duffel-bags");

  // The Gym Bags category card uses the real product photography already
  // stored for the published gym/duffel product — no separate upload needed.
  const gymCardProduct = duffelBags.find((p) => p.thumbnailImage || p.images.length > 0);
  const categoryImages: Partial<Record<string, string>> = {};
  const categoryImageAlts: Partial<Record<string, string>> = {};
  if (gymCardProduct) {
    const src = gymCardProduct.thumbnailImage ?? gymCardProduct.images[0];
    if (src) {
      categoryImages["gym-bags"] = src;
      categoryImageAlts["gym-bags"] =
        gymCardProduct.imageAlts?.[gymCardProduct.images.indexOf(src)] ||
        `${gymCardProduct.productName} — gym bags category`;
    }
  }

  return (
    <CategoryListingPage
      eyebrow="Collection"
      title="Bags Collection"
      intro="Hand bags, gym bags, shoulder bags, party bags and potli bags — shaped for the way you actually carry them."
      breadcrumbs={[{ label: "Bags", to: "/bags" }]}
      products={products}
    >
      <SubcategoryCards
        heading="Browse bag categories"
        headingId="bag-categories"
        items={bagSubcategories}
        images={categoryImages}
        imageAlts={categoryImageAlts}
      />
    </CategoryListingPage>
  );
}
