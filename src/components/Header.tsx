import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import monogramAsset from "../assets/neha-monogram.png.asset.json";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Bags", to: "/bags" },
  { label: "Jewellery", to: "/jewellery" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Best Sellers", to: "/best-sellers" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

const actions = [
  { label: "Search", Icon: Search },
  { label: "Wishlist", Icon: Heart },
  { label: "Account", Icon: User },
  { label: "Cart", Icon: ShoppingBag },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/20 bg-onyx/95 backdrop-blur supports-[backdrop-filter]:bg-onyx/80">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="NEHA LIFESTYLE home">
          <img
            src={monogramAsset.url}
            alt="NEHA LIFESTYLE monogram"
            className="h-11 w-auto shrink-0 sm:h-14"
          />
          <span className="hidden min-w-0 flex-col sm:flex">
            <span className="font-display text-lg font-semibold tracking-[0.22em] whitespace-nowrap text-gold uppercase lg:text-xl lg:tracking-[0.28em]">
              Neha Lifestyle
            </span>
            <span className="hidden text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase sm:block">
              Elevate Your Everyday
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav aria-label="Primary" className="mr-2 hidden items-center gap-6 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="text-[0.7rem] font-medium tracking-[0.2em] text-ivory/70 uppercase transition-colors duration-300 hover:text-gold"
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {actions.map(({ label, Icon }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ivory/80 transition-colors duration-300 hover:bg-burgundy/60 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
            </button>
          ))}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-gold transition-colors duration-300 hover:bg-burgundy/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none xl:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-gold/20 bg-onyx xl:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  onClick={() => setOpen(false)}
                  className="block border-b border-gold/10 py-3 text-sm tracking-[0.2em] text-ivory/80 uppercase transition-colors duration-300 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  activeProps={{ className: "text-gold" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
