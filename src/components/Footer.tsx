import { Link } from "@tanstack/react-router";
import monogramAsset from "../assets/neha-monogram.png.asset.json";

const columns = [
  {
    heading: "Shop",
    links: [
      { label: "Shop All", to: "/shop" },
      { label: "Bags", to: "/bags" },
      { label: "Clutches", to: "/clutches" },
      { label: "Jewellery", to: "/jewellery" },
    ],
  },
  {
    heading: "Collections",
    links: [
      { label: "New Arrivals", to: "/new-arrivals" },
      { label: "Best Sellers", to: "/best-sellers" },
    ],
  },
  {
    heading: "Brand",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-onyx">
      <div className="mx-auto grid w-full max-w-[84rem] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:gap-16 lg:px-12 lg:py-20">
        <div className="flex flex-col">
          <div className="flex min-w-0 items-center gap-3.5">
            <img
              src={monogramAsset.url}
              alt="NEHA LIFESTYLE monogram"
              className="h-12 w-auto shrink-0"
            />
            <span className="font-display text-lg font-light tracking-[0.26em] text-gold uppercase">
              Neha Lifestyle
            </span>
          </div>
          <span aria-hidden="true" className="mt-7 h-px w-14 bg-gold/40" />
          <p className="mt-7 max-w-sm text-[0.85rem] leading-[2] font-light text-muted-foreground">
            Where Elegance Becomes Your Signature. Statement bags and timeless
            jewellery, curated to elevate your everyday.
          </p>
        </div>

        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className="flex flex-col">
            <h2 className="text-[0.6rem] font-light tracking-[0.36em] text-gold uppercase">
              {col.heading}
            </h2>
            <ul className="mt-6 flex flex-col gap-4">
              {col.links.map((link) => (
                <li key={link.to + link.label}>
                  <Link
                    to={link.to}
                    className="text-[0.8rem] font-light tracking-[0.14em] text-ivory/70 transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-gold/10">
        <div className="mx-auto flex w-full max-w-[84rem] flex-col gap-3 px-5 py-7 text-center text-[0.6rem] font-light tracking-[0.32em] text-muted-foreground/80 uppercase sm:flex-row sm:justify-between sm:px-8 sm:text-left lg:px-12">
          <p>Neha Lifestyle</p>
          <p>Elevate Your Everyday</p>
        </div>
      </div>
    </footer>
  );
}
