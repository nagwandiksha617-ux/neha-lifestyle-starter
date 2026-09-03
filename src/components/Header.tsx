import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useShop } from "@/lib/shop-store";
import { bagSubcategories, clutchSubcategory, jewellerySubcategories } from "@/data/products";
import { SearchOverlay } from "./shop/SearchOverlay";
import monogramAsset from "../assets/neha-monogram.png.asset.json";

const shopGroups = [
  {
    label: "Bags",
    to: "/bags" as const,
    links: [...bagSubcategories, clutchSubcategory],
  },
  {
    label: "Jewellery",
    to: "/jewellery" as const,
    links: jewellerySubcategories,
  },
];

const simpleNav = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
] as const;

const tailNav = [
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Best Sellers", to: "/best-sellers" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

const navLinkClass =
  "group relative py-1 text-[0.65rem] font-light tracking-[0.24em] text-ivory/70 uppercase transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

function Underline() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold/70 transition-transform duration-500 ease-out group-hover:scale-x-100 group-data-[status=active]:scale-x-100"
    />
  );
}

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span
      aria-hidden="true"
      className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.55rem] leading-none font-medium text-primary-foreground"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const { cartCount, wishlistCount, setCartOpen, hydrated } = useShop();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close every overlay when the route changes.
  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
    setDropdown(null);
    setMobileGroup(null);
  }, [pathname]);

  useEffect(() => {
    if (!dropdown) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setDropdown(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdown(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropdown]);

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
          <span className="hidden min-w-0 flex-col gap-1 overflow-hidden sm:flex">
            <span className="truncate font-display text-base leading-none font-light tracking-[0.22em] text-gold uppercase 2xl:text-lg">
              Neha Lifestyle
            </span>
            <span className="text-[0.55rem] leading-none font-light tracking-[0.36em] whitespace-nowrap text-muted-foreground/80 uppercase">
              Elevate Your Everyday
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <nav
            ref={navRef}
            aria-label="Primary"
            className="mr-4 hidden items-center gap-5 xl:flex 2xl:gap-7"
          >
            {simpleNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className={navLinkClass}
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
                <Underline />
              </Link>
            ))}

            {shopGroups.map((group) => (
              <div key={group.label} className="relative">
                <button
                  type="button"
                  aria-expanded={dropdown === group.label}
                  aria-haspopup="true"
                  onClick={() => setDropdown((d) => (d === group.label ? null : group.label))}
                  className={cn(
                    navLinkClass,
                    "inline-flex items-center gap-1.5",
                    pathname.startsWith(group.to) && "text-gold",
                  )}
                >
                  {group.label}
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform duration-300",
                      dropdown === group.label && "rotate-180",
                    )}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>

                {dropdown === group.label && (
                  <div className="absolute top-full left-1/2 z-50 mt-4 w-60 -translate-x-1/2 border border-gold/20 bg-onyx p-2 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)]">
                    <ul className="flex flex-col">
                      <li>
                        <Link
                          to={group.to}
                          className="flex min-h-10 items-center px-4 text-[0.62rem] font-light tracking-[0.24em] text-gold uppercase transition-colors duration-300 hover:text-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                          All {group.label}
                        </Link>
                      </li>
                      {group.links.map((link) => (
                        <li key={link.path}>
                          <Link
                            to={link.path}
                            className="flex min-h-10 items-center px-4 text-[0.7rem] font-light tracking-[0.14em] text-ivory/75 transition-colors duration-300 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            {tailNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={navLinkClass}
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
                <Underline />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label={searchOpen ? "Close search" : "Search"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-ivory/75 transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Search className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.25} aria-hidden="true" />
          </button>

          <Link
            to="/wishlist"
            aria-label={
              hydrated && wishlistCount > 0
                ? `Wishlist, ${wishlistCount} items`
                : "Wishlist"
            }
            className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full text-ivory/75 transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            activeProps={{ className: "text-gold" }}
          >
            <Heart className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.25} aria-hidden="true" />
            {hydrated && <CountBadge count={wishlistCount} />}
          </Link>

          <Link
            to="/account"
            aria-label="Account"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-ivory/75 transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            activeProps={{ className: "text-gold" }}
          >
            <User className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.25} aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={hydrated && cartCount > 0 ? `Cart, ${cartCount} items` : "Cart"}
            className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full text-ivory/75 transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ShoppingBag className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.25} aria-hidden="true" />
            {hydrated && <CountBadge count={cartCount} />}
          </button>

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

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="max-h-[75vh] overflow-y-auto border-t border-gold/15 bg-onyx xl:hidden"
        >
          <ul className="mx-auto flex w-full max-w-[84rem] flex-col px-5 py-3 sm:px-8">
            {simpleNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="flex min-h-12 items-center border-b border-gold/10 text-[0.7rem] font-light tracking-[0.28em] text-ivory/80 uppercase transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  activeProps={{ className: "text-gold" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {shopGroups.map((group) => (
              <li key={group.label} className="border-b border-gold/10">
                <button
                  type="button"
                  aria-expanded={mobileGroup === group.label}
                  onClick={() => setMobileGroup((g) => (g === group.label ? null : group.label))}
                  className="flex min-h-12 w-full items-center justify-between text-[0.7rem] font-light tracking-[0.28em] text-ivory/80 uppercase transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {group.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      mobileGroup === group.label && "rotate-180",
                    )}
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                </button>
                {mobileGroup === group.label && (
                  <ul className="pb-3 pl-4">
                    <li>
                      <Link
                        to={group.to}
                        className="flex min-h-11 items-center text-[0.65rem] font-light tracking-[0.22em] text-gold uppercase focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        All {group.label}
                      </Link>
                    </li>
                    {group.links.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className="flex min-h-11 items-center text-[0.72rem] font-light tracking-[0.14em] text-ivory/70 transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            {tailNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
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
