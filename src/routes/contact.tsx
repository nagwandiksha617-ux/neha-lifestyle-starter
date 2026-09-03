import { createFileRoute } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact Neha Lifestyle",
      description:
        "Contact Neha Lifestyle with a question about bags, clutches or jewellery, and we will get back to you.",
      path: "/contact",
      breadcrumbs: [{ name: "Contact", path: "/contact" }],
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
      <Breadcrumbs items={[{ label: "Contact", to: "/contact" }]} />
      <SectionHeading
        as="h1"
        eyebrow="Say Hello"
        title="Contact"
        description="Contact details will be published here soon. Leave a note and we'll be in touch once the collection launches."
        className="mx-auto"
      />
      <form className="mt-12 flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[0.65rem] tracking-[0.22em] text-gold uppercase">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="rounded-sm border border-gold/25 bg-card px-4 py-3 text-sm text-ivory placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            placeholder="Your name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[0.65rem] tracking-[0.22em] text-gold uppercase">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="rounded-sm border border-gold/25 bg-card px-4 py-3 text-sm text-ivory placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-[0.65rem] tracking-[0.22em] text-gold uppercase">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="rounded-sm border border-gold/25 bg-card px-4 py-3 text-sm text-ivory placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            placeholder="How can we help?"
          />
        </div>
        <button
          type="submit"
          className="self-start rounded-sm bg-gold px-8 py-3.5 text-xs font-medium tracking-[0.24em] text-primary-foreground uppercase transition-colors duration-300 hover:bg-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
