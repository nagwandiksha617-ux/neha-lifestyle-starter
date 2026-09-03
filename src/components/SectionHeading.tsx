import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-[0.65rem] tracking-[0.32em] text-gold-soft uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl leading-tight tracking-wide text-ivory sm:text-4xl">
        {title}
      </h2>
      <span aria-hidden="true" className="h-px w-24 gold-rule" />
      {description && (
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
