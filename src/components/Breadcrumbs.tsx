import { Link } from "@tanstack/react-router";

export interface Crumb {
  label: string;
  to: string;
}

/** Visible breadcrumb trail. The last item is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.55rem] font-light tracking-[0.28em] text-muted-foreground/80 uppercase">
        <li>
          <Link
            to="/"
            className="transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Home
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.to} className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-4 bg-gold/30" />
              {isLast ? (
                <span aria-current="page" className="text-gold">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
