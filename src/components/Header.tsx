import { Link } from "@tanstack/react-router";
import monogramAsset from "../assets/neha-monogram.png.asset.json";

const navItems = [
  { label: "Bags", to: "/bags" },
  { label: "Clutches", to: "/clutches" },
  { label: "Jewellery", to: "/jewellery" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/20 bg-onyx/95 backdrop-blur supports-[backdrop-filter]:bg-onyx/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={monogramAsset.url}
            alt="NEHA LIFESTYLE monogram"
            className="h-12 w-auto sm:h-14"
          />
          <span className="font-display text-lg font-semibold tracking-[0.3em] uppercase text-gold sm:text-xl">
            NEHA LIFESTYLE
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium tracking-widest uppercase text-gold-soft/70 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
