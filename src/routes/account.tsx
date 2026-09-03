import { createFileRoute, Link } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/account")({
  head: () =>
    pageHead({
      title: "Account | Neha Lifestyle",
      description: "Your Neha Lifestyle account area.",
      path: "/account",
      robots: "noindex, follow",
      breadcrumbs: [{ name: "Account", path: "/account" }],
    }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <main className="mx-auto w-full max-w-[52rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <Breadcrumbs items={[{ label: "Account", to: "/account" }]} />
      <SectionHeading
        as="h1"
        eyebrow="Account"
        title="Your Account"
        description="Accounts and order history are being set up. Your cart and wishlist are saved on this device in the meantime."
      />

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Link
          to="/wishlist"
          className="inline-flex min-h-12 items-center border border-gold/40 px-7 text-[0.65rem] font-medium tracking-[0.26em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          View Wishlist
        </Link>
        <Link
          to="/cart"
          className="inline-flex min-h-12 items-center border border-gold/40 px-7 text-[0.65rem] font-medium tracking-[0.26em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          View Cart
        </Link>
      </div>
    </main>
  );
}
