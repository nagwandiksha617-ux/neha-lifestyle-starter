import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Gem,
  HandHeart,
  ShieldCheck,
  Sparkles,
  Truck,
  Wand2,
} from "lucide-react";

import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ProductCardPlaceholder } from "@/components/ProductCardPlaceholder";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEHA LIFESTYLE — Where Elegance Becomes Your Signature" },
      {
        name: "description",
        content:
          "Discover statement bags and timeless jewellery designed to elevate your everyday style at NEHA LIFESTYLE.",
      },
      { property: "og:title", content: "NEHA LIFESTYLE — Where Elegance Becomes Your Signature" },
      {
        property: "og:description",
        content:
          "Statement bags and timeless jewellery, curated to elevate your everyday style.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const categoryCards = [
  { name: "Bags", to: "/bags", note: "Bags category imagery" },
  { name: "Clutches", to: "/clutches", note: "Clutches category imagery" },
  { name: "Jewellery", to: "/jewellery", note: "Jewellery category imagery" },
] as const;

const bagCategories = [
  "Hand Bags",
  "Gym Bags",
  "Travel Bags",
  "Shoulder Bags",
  "Party Bags",
  "Potli Bags",
  "Clutches",
];

const jewelleryCategories = [
  "Earrings",
  "Rings",
  "Necklaces",
  "Bracelets",
  "Jewellery Sets",
  "Pendants",
  "Watches",
];

const whyPoints = [
  { title: "Premium Designs", Icon: Sparkles, copy: "Silhouettes chosen for a refined, elevated look." },
  { title: "Trend-Focused Collection", Icon: Wand2, copy: "Pieces selected with an eye on the season ahead." },
  { title: "Carefully Selected Products", Icon: HandHeart, copy: "Every piece is reviewed before it joins the edit." },
  { title: "Affordable Luxury", Icon: Gem, copy: "A luxury feel that stays within reach." },
  { title: "Secure Delivery", Icon: Truck, copy: "Orders packed and dispatched with care." },
  { title: "Easy Shopping Experience", Icon: ShieldCheck, copy: "A calm, uncluttered path from browse to checkout." },
];

const goldButton =
  "inline-flex items-center justify-center rounded-sm bg-gold px-8 py-3.5 text-xs font-medium tracking-[0.24em] text-primary-foreground uppercase transition-colors duration-300 hover:bg-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";
const outlineButton =
  "inline-flex items-center justify-center rounded-sm border border-gold/60 px-8 py-3.5 text-xs font-medium tracking-[0.24em] text-gold uppercase transition-colors duration-300 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

function Index() {
  return (
    <main className="bg-background">
      {/* 1 — Hero */}
      <section aria-labelledby="hero-heading" className="relative w-full surface-luxe">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div className="fade-up flex flex-col items-start gap-6">
            <span className="text-[0.65rem] tracking-[0.34em] text-gold-soft uppercase">
              Elevate Your Everyday
            </span>
            <h1
              id="hero-heading"
              className="font-display text-4xl leading-[1.05] tracking-[0.12em] text-ivory uppercase sm:text-6xl"
            >
              Neha Lifestyle
            </h1>
            <p className="font-display text-2xl text-gold sm:text-3xl">
              Where Elegance Becomes Your Signature
            </p>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Discover statement bags and timeless jewellery designed to elevate
              your everyday style.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/new-arrivals" className={goldButton}>
                Shop New Collection
              </Link>
              <Link to="/shop" className={outlineButton}>
                Explore Collections
              </Link>
            </div>
          </div>

          <ImagePlaceholder
            label="Hero Image"
            hint="Full-width NEHA LIFESTYLE campaign image"
            ratio="hero"
            className="fade-up"
          />
        </div>
      </section>

      {/* 2 — Shop New Collection */}
      <section aria-labelledby="new-collection-heading" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Shop By Category"
          title="Shop New Collection"
          description="Browse the house categories. Category imagery will be added with the first collection drop."
          className="mx-auto"
        />
        <h2 id="new-collection-heading" className="sr-only">
          Shop New Collection
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryCards.map((cat) => (
            <Link
              key={cat.to}
              to={cat.to}
              className="group flex flex-col overflow-hidden rounded-sm border border-gold/20 bg-card transition-colors duration-300 hover:border-gold/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <ImagePlaceholder label={cat.name} hint={cat.note} ratio="landscape" />
              <span className="flex items-center justify-between px-5 py-4">
                <span className="font-display text-xl tracking-wide text-ivory">{cat.name}</span>
                <span className="text-[0.65rem] tracking-[0.22em] text-gold uppercase">
                  Explore
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3 — Best Sellers */}
      <section aria-labelledby="best-sellers-heading" className="border-y border-gold/10 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Catalog Layout Preview"
            title="Best Sellers"
            description="These cards show how products will appear. No products have been added yet."
            className="mx-auto"
          />
          <h2 id="best-sellers-heading" className="sr-only">
            Best Sellers
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <ProductCardPlaceholder key={i} slotLabel={`Best seller slot ${i}`} />
            ))}
          </div>
        </div>
      </section>

      {/* 4 — New Arrivals */}
      <section aria-labelledby="new-arrivals-heading" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Catalog Layout Preview"
          title="New Arrivals"
          description="Reserved for the newest pieces. Names, prices and ratings appear once the catalog is live."
          className="mx-auto"
        />
        <h2 id="new-arrivals-heading" className="sr-only">
          New Arrivals
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <ProductCardPlaceholder key={i} slotLabel={`New arrival slot ${i}`} />
          ))}
        </div>
      </section>

      {/* 5 — Bags Collection */}
      <section aria-labelledby="bags-heading" className="border-y border-gold/10 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Collection"
            title="Bags Collection"
            description="From everyday carry to occasion pieces."
            align="left"
          />
          <h2 id="bags-heading" className="sr-only">
            Bags Collection
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bagCategories.map((name) => (
              <li key={name}>
                <Link
                  to="/bags"
                  className="flex items-center justify-between rounded-sm border border-gold/20 bg-card px-5 py-4 transition-colors duration-300 hover:border-gold/60 hover:bg-burgundy/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <span className="text-sm tracking-[0.14em] text-ivory uppercase">{name}</span>
                  <span aria-hidden="true" className="text-gold">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 — Jewellery Collection */}
      <section aria-labelledby="jewellery-heading" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Collection"
          title="Jewellery Collection"
          description="Timeless pieces to finish every look."
          align="left"
        />
        <h2 id="jewellery-heading" className="sr-only">
          Jewellery Collection
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {jewelleryCategories.map((name) => (
            <li key={name}>
              <Link
                to="/jewellery"
                className="flex items-center justify-between rounded-sm border border-gold/20 bg-card px-5 py-4 transition-colors duration-300 hover:border-gold/60 hover:bg-burgundy/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <span className="text-sm tracking-[0.14em] text-ivory uppercase">{name}</span>
                <span aria-hidden="true" className="text-gold">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 7 — Why Neha Lifestyle */}
      <section aria-labelledby="why-heading" className="border-y border-gold/10 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="The Difference" title="Why Neha Lifestyle" className="mx-auto" />
          <h2 id="why-heading" className="sr-only">
            Why Neha Lifestyle
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map(({ title, copy, Icon }) => (
              <li
                key={title}
                className="flex gap-4 rounded-sm border border-gold/20 bg-card p-6 transition-colors duration-300 hover:border-gold/50"
              >
                <Icon className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="font-display text-xl tracking-wide text-ivory">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 — Luxury Brand Story */}
      <section aria-labelledby="story-heading" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ImagePlaceholder
            label="Brand Story Image"
            hint="Editorial brand portrait to be added"
            ratio="landscape"
          />
          <div className="flex flex-col gap-5">
            <span className="text-[0.65rem] tracking-[0.32em] text-gold-soft uppercase">
              Our Story
            </span>
            <h2 id="story-heading" className="font-display text-4xl tracking-wide text-ivory">
              Elevate Your Everyday
            </h2>
            <span aria-hidden="true" className="h-px w-24 gold-rule" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              NEHA LIFESTYLE begins with a simple idea: the pieces you reach for
              every day should feel considered. Bags with presence, jewellery
              with quiet confidence — chosen so that elegance becomes second
              nature rather than an occasion.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The collection is being prepared with that intent. Each edit will
              stay deliberately small, so every piece earns its place.
            </p>
          </div>
        </div>
      </section>

      {/* 9 — Customer Reviews */}
      <section aria-labelledby="reviews-heading" className="border-y border-gold/10 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Coming Soon"
            title="Customer Reviews"
            description="This space is reserved for real customer stories. No reviews have been collected yet."
            className="mx-auto"
          />
          <h2 id="reviews-heading" className="sr-only">
            Customer Reviews
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-sm border border-dashed border-gold/30 bg-card p-6 text-center"
              >
                <span className="font-display text-lg tracking-wide text-gold">
                  Awaiting Customer Story
                </span>
                <span className="mx-auto h-px w-16 gold-rule" aria-hidden="true" />
                <p className="text-xs leading-relaxed tracking-[0.12em] text-muted-foreground uppercase">
                  Review slot {i} — verified customer words will appear here
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Instagram / Shop The Look */}
      <section aria-labelledby="instagram-heading" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading title="Seen It On Instagram? Shop The Look." className="mx-auto" />
        <h2 id="instagram-heading" className="sr-only">
          Seen It On Instagram? Shop The Look.
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ImagePlaceholder
              key={i}
              label={`Look ${i}`}
              hint="Social image to be added"
              ratio="square"
            />
          ))}
        </div>
      </section>

      {/* 11 — Final CTA */}
      <section aria-labelledby="cta-heading" className="surface-luxe">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
          <h2 id="cta-heading" className="font-display text-4xl tracking-wide text-ivory sm:text-5xl">
            Your Signature Style Starts Here
          </h2>
          <span aria-hidden="true" className="h-px w-28 gold-rule" />
          <Link to="/new-arrivals" className={goldButton}>
            Shop New Collection
          </Link>
        </div>
      </section>
    </main>
  );
}
