import { Link, type LinkProps } from "@tanstack/react-router";

interface ProductNotFoundProps {
  /** Where "Back to collection" should lead. */
  backTo: NonNullable<LinkProps["to"]>;
  backLabel: string;
}

/** Friendly empty state for an unknown or removed product URL. */
export function ProductNotFound({ backTo, backLabel }: ProductNotFoundProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-24 text-center sm:px-8 sm:py-32">
      <p className="text-[0.55rem] font-light tracking-[0.32em] text-gold-soft/80 uppercase">
        Page not found
      </p>
      <h1 className="mt-5 font-display text-3xl leading-tight font-light tracking-[0.06em] text-ivory sm:text-4xl">
        This piece isn’t available
      </h1>
      <span aria-hidden="true" className="mx-auto mt-6 block h-px w-16 bg-gold/40" />
      <p className="mt-6 text-[0.9rem] leading-relaxed font-light text-muted-foreground">
        The product you are looking for may have been moved, renamed, or is not part of the
        catalogue yet. Explore the collection to find something else you love.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          to={backTo}
          className="inline-flex min-h-12 items-center justify-center bg-gold px-8 py-3.5 text-[0.65rem] font-medium tracking-[0.28em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {backLabel}
        </Link>
        <Link
          to="/shop"
          className="inline-flex min-h-12 items-center justify-center border border-gold/40 px-8 py-3.5 text-[0.65rem] font-medium tracking-[0.28em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
