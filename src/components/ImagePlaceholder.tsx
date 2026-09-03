import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Ratio = "hero" | "portrait" | "square" | "landscape";

const ratioClass: Record<Ratio, string> = {
  hero: "aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]",
  portrait: "aspect-[3/4]",
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
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={cn(
        "group/ph relative w-full overflow-hidden rounded-sm border border-gold/25 bg-muted",
        ratioClass[ratio],
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 surface-luxe transition-transform duration-700 ease-out",
          zoomOnHover && "group-hover:scale-105 group-hover/ph:scale-105",
        )}
      />
      <div
        aria-hidden="true"
        className="absolute inset-3 rounded-sm border border-gold/20"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
        <ImageIcon className="h-6 w-6 text-gold/70" aria-hidden="true" />
        <span className="font-display text-base tracking-[0.18em] text-gold uppercase sm:text-lg">
          {label}
        </span>
        <span className="max-w-[22ch] text-[0.65rem] leading-relaxed tracking-[0.14em] text-muted-foreground uppercase">
          {hint ?? "Real photography to be added"}
        </span>
      </div>
    </div>
  );
}
