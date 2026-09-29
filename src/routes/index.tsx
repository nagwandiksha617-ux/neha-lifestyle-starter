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
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { organizationSchema, pageHead, websiteSchema } from "@/lib/seo";
import jalMahal from "@/assets/jal-mahal-evening.jpg";
import heroLogo from "@/assets/neha-hero-logo.jpeg.asset.json";
import heroClutch from "@/assets/ornate-gold-pearl-clutch.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Neha Lifestyle | Premium Bags, Clutches & Jewellery",
      description:
        "Discover premium bags, clutches and jewellery at Neha Lifestyle. Explore elegant, trend-focused styles designed to elevate your everyday look.",
      path: "/",
      twitterCard: "summary_large_image",
      jsonLd: [organizationSchema(), websiteSchema()],
    }),
  component: Index,
});

const categoryCards = [
  { name: "Bags", to: "/bags", note: "Bags editorial image" },
  { name: "Clutches", to: "/clutches", note: "Clutches editorial image" },
  { name: "Jewellery", to: "/jewellery", note: "Jewellery editorial image" },
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
  "inline-flex min-h-12 items-center justify-center bg-gold px-9 py-3.5 text-[0.65rem] font-medium tracking-[0.3em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none";
const outlineButton =
  "inline-flex min-h-12 items-center justify-center border border-gold/45 px-9 py-3.5 text-[0.65rem] font-medium tracking-[0.3em] text-gold uppercase transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none";

function CollectionIndex({
  items,
  to,
}: {
  items: string[];
  to: "/bags" | "/jewellery";
}) {
  return (
    <ul className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
      {items.map((name, i) => (
        <li key={name} className="border-b border-gold/10">
          <Link
            to={to}
            className="group flex min-h-14 items-center gap-5 py-4 transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <span className="font-display text-xs font-light tracking-[0.2em] text-gold/60">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1 truncate text-[0.78rem] font-light tracking-[0.22em] text-ivory/85 uppercase transition-colors duration-500 group-hover:text-gold">
              {name}
            </span>
            <span
              aria-hidden="true"
              className="h-px w-6 bg-gold/30 transition-all duration-500 group-hover:w-10 group-hover:bg-gold"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Index() {
  return (
    <main className="bg-background">
      {/* 1 — Hero */}
      <section aria-labelledby="hero-heading" className="homepage-hero relative isolate overflow-hidden bg-onyx">
        <img
          src={jalMahal}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1024}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div aria-hidden="true" className="homepage-hero-veil absolute inset-0" />
        <div className="relative mx-auto grid max-w-[84rem] items-center gap-3 px-5 pb-3 pt-5 sm:px-8 lg:min-h-[700px] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-10 lg:px-12 lg:py-12">
          <div className="fade-up z-10 flex min-w-0 flex-col items-start lg:pb-10">
            <img
              src={heroLogo.url}
              alt="NEHA LIFESTYLE — Bags, Jewellery, Accessories"
              width={1536}
              height={1024}
              className="mb-4 w-36 max-w-full object-contain shadow-lg shadow-onyx/30 sm:w-56 lg:mb-12 lg:w-64"
            />
            <span aria-hidden="true" className="mb-4 h-px w-14 bg-gold lg:mb-5" />
            <h1 id="hero-heading" className="max-w-[13ch] font-display text-[2.4rem] leading-[1.04] font-medium text-ivory sm:text-6xl lg:text-[4.5rem]">
              Where Elegance Meets Everyday Luxury
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed font-normal text-ivory sm:text-base lg:mt-7">
              Discover Bags &amp; Jewellery Made to Make You Shine
            </p>
            <div className="mt-5 flex flex-wrap gap-3 lg:mt-9">
              <Button asChild className="h-12 rounded-none bg-gold px-7 text-xs font-semibold uppercase text-primary-foreground transition-all duration-300 hover:bg-gold-soft hover:shadow-lg hover:shadow-onyx/30">
                <Link to="/bags">Shop Bags</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-none border-gold bg-onyx/45 px-7 text-xs font-semibold uppercase text-ivory transition-all duration-300 hover:bg-gold hover:text-primary-foreground">
                <Link to="/jewellery">Shop Jewellery</Link>
              </Button>
            </div>
          </div>
          <div className="homepage-hero-product fade-up relative mx-auto w-full max-w-[390px] self-end lg:max-w-[490px] lg:self-center">
            <img
              src={heroClutch.url}
              alt="Ornate gold clutch with pearl chains and green and ruby-toned details"
              width={1085}
              height={1450}
              className="h-[225px] w-full object-contain object-center drop-shadow-2xl sm:h-[370px] lg:h-[590px]"
            />
          </div>
        </div>
      </section>

      {/* 2 — Shop New Collection */}
      <Section labelledBy="new-collection-heading">
        <SectionHeading
          id="new-collection-heading"
          eyebrow="The Edit"
          title="Shop New Collection"
          description="A preview of how the collection will be presented. Pieces and photography arrive with the first drop."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <ProductCardPlaceholder key={i} slotLabel={`Collection slot ${i}`} />
          ))}
        </div>
      </Section>

      {/* 3 — Best Sellers */}
      <Section tone="raised" labelledBy="best-sellers-heading">
        <SectionHeading
          id="best-sellers-heading"
          eyebrow="Catalog Layout Preview"
          title="Best Sellers"
          description="These cards show how products will appear. No products have been added yet."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <ProductCardPlaceholder key={i} slotLabel={`Best seller slot ${i}`} />
          ))}
        </div>
      </Section>

      {/* 4 — New Arrivals */}
      <Section labelledBy="new-arrivals-heading">
        <SectionHeading
          id="new-arrivals-heading"
          eyebrow="Catalog Layout Preview"
          title="New Arrivals"
          description="Reserved for the newest pieces. Names, prices and ratings appear once the catalog is live."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <ProductCardPlaceholder key={i} slotLabel={`New arrival slot ${i}`} />
          ))}
        </div>
      </Section>

      {/* Shop by category — editorial cards */}
      <Section tone="raised" labelledBy="category-heading">
        <SectionHeading
          id="category-heading"
          eyebrow="Shop By Category"
          title="Three Houses, One Signature"
          description="Bags, clutches and jewellery — each with its own editorial world."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {categoryCards.map((cat) => (
            <Link
              key={cat.to}
              to={cat.to}
              className="group relative block overflow-hidden border border-gold/12 transition-colors duration-500 hover:border-gold/45 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              <ImagePlaceholder label={cat.name} hint={cat.note} ratio="tall" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-burgundy-dark/85 via-onyx/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-6 py-6">
                <span className="font-display text-2xl font-light tracking-[0.16em] text-ivory uppercase">
                  {cat.name}
                </span>
                <span className="flex items-center gap-2 text-[0.55rem] font-light tracking-[0.3em] text-gold uppercase">
                  Explore
                  <span
                    aria-hidden="true"
                    className="h-px w-5 bg-gold transition-all duration-500 group-hover:w-9"
                  />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 5 — Bags Collection */}
      <Section labelledBy="bags-heading">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="flex flex-col">
            <SectionHeading
              id="bags-heading"
              eyebrow="Collection I"
              title="Bags Collection"
              description="From everyday carry to occasion pieces — structured, considered, and built to be lived in."
              align="left"
            />
            <Link to="/bags" className={`${outlineButton} mt-10 self-start`}>
              View Bags
            </Link>
          </div>
          <CollectionIndex items={bagCategories} to="/bags" />
        </div>
      </Section>

      {/* 6 — Jewellery Collection */}
      <Section tone="raised" labelledBy="jewellery-heading">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <CollectionIndex items={jewelleryCategories} to="/jewellery" />
          <div className="flex flex-col lg:order-last">
            <SectionHeading
              id="jewellery-heading"
              eyebrow="Collection II"
              title="Jewellery Collection"
              description="Timeless pieces to finish every look — quiet gold, clean lines, lasting presence."
              align="left"
            />
            <Link to="/jewellery" className={`${outlineButton} mt-10 self-start`}>
              View Jewellery
            </Link>
          </div>
        </div>
      </Section>

      {/* 7 — Why Neha Lifestyle */}
      <Section labelledBy="why-heading">
        <SectionHeading id="why-heading" eyebrow="The Difference" title="Why Neha Lifestyle" />
        <ul className="mt-16 grid gap-px border border-gold/10 bg-gold/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {whyPoints.map(({ title, copy, Icon }) => (
            <li
              key={title}
              className="flex flex-col gap-4 bg-background p-8 transition-colors duration-500 hover:bg-burgundy-dark/40 lg:p-10"
            >
              <Icon className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.15} aria-hidden="true" />
              <h3 className="font-display text-xl font-light tracking-[0.08em] text-ivory">
                {title}
              </h3>
              <p className="text-[0.85rem] leading-[1.9] font-light text-muted-foreground">
                {copy}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 8 — Luxury Brand Story */}
      <Section tone="raised" labelledBy="story-heading">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-4 -left-4 hidden h-14 w-14 border-t border-l border-gold/30 sm:block"
            />
            <ImagePlaceholder
              label="Brand Portrait"
              hint="Editorial brand image to be added"
              ratio="portrait"
              editorial
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[0.6rem] font-light tracking-[0.42em] text-gold-soft uppercase">
              Our Story
            </span>
            <h2
              id="story-heading"
              className="mt-6 font-display text-[2.2rem] leading-[1.15] font-light tracking-[0.06em] text-ivory sm:text-[3rem]"
            >
              Elevate Your Everyday
            </h2>
            <span aria-hidden="true" className="mt-8 h-px w-16 bg-gold/50" />
            <p className="mt-8 max-w-lg font-display text-xl leading-[1.7] font-light text-ivory/85 sm:text-2xl">
              The pieces you reach for every day should feel considered.
            </p>
            <p className="mt-6 max-w-lg text-[0.9rem] leading-[2] font-light text-muted-foreground">
              Bags with presence, jewellery with quiet confidence — chosen so
              that elegance becomes second nature rather than an occasion.
            </p>
            <p className="mt-5 max-w-lg text-[0.9rem] leading-[2] font-light text-muted-foreground">
              The collection is being prepared with that intent. Each edit will
              stay deliberately small, so every piece earns its place.
            </p>
          </div>
        </div>
      </Section>

      {/* 9 — Customer Reviews */}
      <Section labelledBy="reviews-heading">
        <SectionHeading
          id="reviews-heading"
          eyebrow="Placeholder Section"
          title="Customer Reviews"
          description="This space is reserved for real customer stories. No reviews have been collected yet."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-5 border border-dashed border-gold/25 bg-card/30 px-8 py-12 text-center"
            >
              <span aria-hidden="true" className="h-px w-10 bg-gold/40" />
              <span className="font-display text-lg font-light tracking-[0.14em] text-gold/90">
                Awaiting Customer Story
              </span>
              <p className="text-[0.6rem] leading-[2] font-light tracking-[0.26em] text-muted-foreground/80 uppercase">
                Review slot {i} — verified customer words will appear here
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 10 — Instagram / Shop The Look */}
      <Section tone="raised" labelledBy="instagram-heading">
        <SectionHeading
          id="instagram-heading"
          eyebrow="Shop The Look"
          title="Seen It On Instagram? Shop The Look."
        />
        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-20 lg:grid-cols-6 lg:gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ImagePlaceholder
              key={i}
              label={`Look ${i}`}
              hint="Social image to be added"
              ratio="square"
            />
          ))}
        </div>
      </Section>

      {/* 11 — Final CTA */}
      <section aria-labelledby="cta-heading" className="surface-luxe">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-28 text-center sm:px-8 lg:py-40">
          <span className="text-[0.6rem] font-light tracking-[0.46em] text-gold-soft uppercase">
            Elevate Your Everyday
          </span>
          <h2
            id="cta-heading"
            className="mt-8 font-display text-[2.4rem] leading-[1.1] font-light tracking-[0.08em] text-ivory sm:text-[3.4rem]"
          >
            Your Signature Style Starts Here
          </h2>
          <span aria-hidden="true" className="mt-10 h-px w-20 bg-gold/60" />
          <Link to="/new-arrivals" className={`${goldButton} mt-12`}>
            Shop New Collection
          </Link>
        </div>
      </section>
    </main>
  );
}
