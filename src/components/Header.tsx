import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-onyx/90 backdrop-blur-md transition-all duration-500 ease-out supports-[backdrop-filter]:bg-onyx/75",
        scrolled ? "border-gold/25 shadow-[0_1px_0_0_rgba(212,175,106,0.08)]" : "border-gold/10",
      )}
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-[84rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 transition-all duration-500 ease-out sm:px-8 lg:px-12",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          aria-label="NEHA LIFESTYLE home"
        >
          <img
            src={monogramAsset.url}
            alt="NEHA LIFESTYLE monogram"
            className={cn(
              "w-auto shrink-0 transition-all duration-500 ease-out",
              scrolled ? "h-9 sm:h-10" : "h-11 sm:h-13",
            )}
          />
          <span className="hidden min-w-0 flex-col gap-1 sm:flex">
            <span className="font-display text-lg leading-none font-light tracking-[0.26em] whitespace-nowrap text-gold uppercase lg:text-xl">
              Neha Lifestyle
            </span>
            <span className="text-[0.55rem] leading-none font-light tracking-[0.36em] whitespace-nowrap text-muted-foreground/80 uppercase">
              Elevate Your Everyday
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <nav aria-label="Primary" className="mr-4 hidden items-center gap-7 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="group relative py-1 text-[0.65rem] font-light tracking-[0.24em] text-ivory/70 uppercase transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold/70 transition-transform duration-500 ease-out group-hover:scale-x-100 group-data-[status=active]:scale-x-100"
                />
              </Link>
            ))}
          </nav>

          {actions.map(({ label, Icon }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-ivory/75 transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.25} aria-hidden="true" />
            </button>
          ))}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="ml-1 grid h-11 w-11 shrink-0 place-items-center rounded-full text-gold transition-colors duration-500 hover:text-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none xl:hidden"
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-gold/15 bg-onyx xl:hidden"
        >
          <ul className="mx-auto flex w-full max-w-[84rem] flex-col px-5 py-3 sm:px-8">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-gold/10 text-[0.7rem] font-light tracking-[0.28em] text-ivory/80 uppercase transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
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
