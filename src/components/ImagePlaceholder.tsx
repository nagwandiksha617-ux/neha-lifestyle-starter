import { cn } from "@/lib/utils";

type Ratio = "hero" | "portrait" | "tall" | "square" | "landscape";

const ratioClass: Record<Ratio, string> = {
  hero: "aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5]",
  portrait: "aspect-[4/5]",
  tall: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

interface ImagePlaceholderProps {
  /** Short, human-readable note about the real image that will replace this. */
  label: string;
  hint?: string;
  ratio?: Ratio;
  className?: string;
  zoomOnHover?: boolean;
  /** Larger, quieter treatment for hero/editorial use. */
  editorial?: boolean;
  /** Keeps the accessible label but hides the visible caption (thumbnails). */
  hideCaption?: boolean;
}

/**
 * Reusable, aspect-ratio preserving placeholder used everywhere a real
 * NEHA LIFESTYLE photograph will later be dropped in.
 */
export function ImagePlaceholder({
  label,
  hint,
  ratio = "portrait",
  className,
  zoomOnHover = true,
  editorial = false,
  hideCaption = false,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={cn(
        "group/ph relative w-full overflow-hidden bg-onyx",
        ratioClass[ratio],
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 surface-luxe transition-transform duration-[900ms] ease-out",
          zoomOnHover && "group-hover:scale-[1.04] group-hover/ph:scale-[1.04]",
        )}
      />
      {/* discreet champagne-gold linework */}
      <div aria-hidden="true" className="absolute inset-0 border border-gold/15" />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute border-t border-b border-gold/10",
          editorial ? "inset-x-6 inset-y-8 sm:inset-x-10 sm:inset-y-12" : "inset-x-4 inset-y-5",
        )}
      />

      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center",
          hideCaption && "hidden",
        )}
      >
        <span
          aria-hidden="true"
          className={cn("h-px bg-gold/40", editorial ? "w-14" : "w-8")}
        />
        <span
          className={cn(
            "font-display font-light tracking-[0.3em] text-gold/90 uppercase",
            editorial ? "text-lg sm:text-2xl" : "text-sm sm:text-base",
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            "max-w-[24ch] leading-[1.9] font-light tracking-[0.24em] text-muted-foreground/80 uppercase",
            editorial ? "text-[0.6rem] sm:text-[0.65rem]" : "text-[0.55rem]",
          )}
        >
          {hint ?? "Photography to be added"}
        </span>
      </div>
    </div>
  );
}
