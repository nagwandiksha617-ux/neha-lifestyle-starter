import { createFileRoute } from "@tanstack/react-router";

import { InfoPage } from "@/components/InfoPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead({
      title: "FAQ | Neha Lifestyle",
      description:
        "Frequently asked questions about shopping with Neha Lifestyle, covering orders, shipping, returns and product care.",
      path: "/faq",
      breadcrumbs: [{ name: "FAQ", path: "/faq" }],
    }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <InfoPage
      eyebrow="Help Centre"
      title="Frequently Asked Questions"
      description="Answers are published here as each policy is confirmed. The topics below are the areas we will cover."
      breadcrumbs={[{ label: "FAQ", to: "/faq" }]}
      sections={[
        {
          heading: "Orders",
          body: "How to place an order, order confirmation, and how to make changes before dispatch. Details to be published.",
        },
        {
          heading: "Shipping",
          body: "Dispatch timelines, delivery coverage and tracking. Details to be published on the shipping page.",
        },
        {
          heading: "Returns and exchanges",
          body: "Return eligibility, timeframes and how refunds are issued. Details to be published on the returns page.",
        },
        {
          heading: "Product care",
          body: "How to care for bags and jewellery so pieces last. Guidance to be published alongside the first collection.",
        },
      ]}
    />
  );
}
