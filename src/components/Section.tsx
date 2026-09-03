import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Adds a very subtle raised surface + hairline rules. */
  tone?: "base" | "raised";
  labelledBy?: string;
  id?: string;
}

/**
 * Shared vertical rhythm + container for every homepage section so the page
 * reads with one consistent editorial cadence.
 */
export function Section({
  children,
  className,
  tone = "base",
  labelledBy,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "w-full",
        tone === "raised" && "border-y border-gold/10 bg-muted/30",
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[84rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32",
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
}
