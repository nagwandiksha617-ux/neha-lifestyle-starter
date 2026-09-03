import { createFileRoute } from "@tanstack/react-router";

import { InfoPage } from "@/components/InfoPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/returns")({
  head: () =>
    pageHead({
      title: "Returns & Exchanges | Neha Lifestyle",
      description:
        "Returns and exchanges information for Neha Lifestyle orders, including eligibility, timeframes and refunds.",
      path: "/returns",
      breadcrumbs: [{ name: "Returns", path: "/returns" }],
      robots: "noindex, follow",
    }),
  component: ReturnsPage,
});

function ReturnsPage() {
  return (
    <InfoPage
      eyebrow="Customer Care"
      title="Returns & Exchanges"
      description="Our returns policy is being finalised and will be published here before the first collection goes on sale."
      breadcrumbs={[{ label: "Returns", to: "/returns" }]}
      sections={[
        { heading: "Eligibility", body: "To be published." },
        { heading: "Timeframes", body: "To be published." },
        { heading: "Refunds", body: "To be published." },
      ]}
    />
  );
}
