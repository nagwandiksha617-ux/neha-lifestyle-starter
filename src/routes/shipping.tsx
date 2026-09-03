import { createFileRoute } from "@tanstack/react-router";

import { InfoPage } from "@/components/InfoPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/shipping")({
  head: () =>
    pageHead({
      title: "Shipping Information | Neha Lifestyle",
      description:
        "Shipping information for Neha Lifestyle orders, including dispatch timelines, delivery coverage and tracking.",
      path: "/shipping",
      breadcrumbs: [{ name: "Shipping", path: "/shipping" }],
      robots: "noindex, follow",
    }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <InfoPage
      eyebrow="Customer Care"
      title="Shipping Information"
      description="Our shipping policy is being finalised and will be published here before the first collection goes on sale."
      breadcrumbs={[{ label: "Shipping", to: "/shipping" }]}
      sections={[
        { heading: "Dispatch timelines", body: "To be published." },
        { heading: "Delivery coverage", body: "To be published." },
        { heading: "Tracking", body: "To be published." },
      ]}
    />
  );
}
