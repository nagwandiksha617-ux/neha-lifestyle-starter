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
    <footer className="border-t border-gold/20 bg-onyx">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={monogramAsset.url}
              alt="NEHA LIFESTYLE monogram"
              className="h-12 w-auto shrink-0"
            />
            <span className="font-display text-lg tracking-[0.28em] text-gold uppercase">
              Neha Lifestyle
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Where Elegance Becomes Your Signature. Statement bags and timeless
            jewellery, curated to elevate your everyday.
          </p>
        </div>

        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-3">
            <h2 className="text-[0.65rem] tracking-[0.28em] text-gold uppercase">
              {col.heading}
            </h2>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.to + link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-ivory/70 transition-colors duration-300 hover:text-gold"
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
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-center text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <p>Neha Lifestyle</p>
          <p>Elevate Your Everyday</p>
        </div>
      </div>
    </footer>
  );
}
