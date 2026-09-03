import { createFileRoute } from "@tanstack/react-router";

import { InfoPage } from "@/components/InfoPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Policy | Neha Lifestyle",
      description:
        "How Neha Lifestyle handles personal information collected through this website.",
      path: "/privacy",
      breadcrumbs: [{ name: "Privacy", path: "/privacy" }],
      robots: "noindex, follow",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="Our privacy policy is being prepared and will be published here before any personal data is collected."
      breadcrumbs={[{ label: "Privacy", to: "/privacy" }]}
      sections={[
        { heading: "Information we collect", body: "To be published." },
        { heading: "How information is used", body: "To be published." },
        { heading: "Your rights", body: "To be published." },
      ]}
    />
  );
}
