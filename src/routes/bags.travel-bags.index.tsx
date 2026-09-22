import { createFileRoute, redirect } from "@tanstack/react-router";

/** Travel Bags moved to its own main category. */
export const Route = createFileRoute("/bags/travel-bags/")({
  beforeLoad: () => {
    throw redirect({ to: "/travel-bags", statusCode: 301 });
  },
});
