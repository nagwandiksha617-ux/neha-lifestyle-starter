import { createFileRoute } from "@tanstack/react-router";

import { InfoPage } from "@/components/InfoPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms & Conditions | Neha Lifestyle",
      description:
        "The terms and conditions that apply when using the Neha Lifestyle website.",
      path: "/terms",
      breadcrumbs: [{ name: "Terms", path: "/terms" }],
      robots: "noindex, follow",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Terms & Conditions"
      description="Our terms are being prepared and will be published here before the store opens for orders."
      breadcrumbs={[{ label: "Terms", to: "/terms" }]}
      sections={[
        { heading: "Use of this website", body: "To be published." },
        { heading: "Orders and pricing", body: "To be published." },
        { heading: "Liability", body: "To be published." },
      ]}
    />
  );
}
