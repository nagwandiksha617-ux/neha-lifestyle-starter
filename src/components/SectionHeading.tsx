import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  id,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "mx-auto max-w-2xl items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-[0.6rem] leading-none font-light tracking-[0.42em] text-gold-soft uppercase">
          {eyebrow}
        </span>
      )}
      <h2
        id={id}
        className={cn(
          "font-display text-[2rem] leading-[1.15] font-light tracking-[0.06em] text-ivory sm:text-[2.6rem]",
          eyebrow ? "mt-5" : "",
        )}
      >
        {title}
      </h2>
      <span
        aria-hidden="true"
        className={cn("mt-6 h-px w-16 bg-gold/50", centered && "mx-auto")}
      />
      {description && (
        <p className="mt-6 max-w-xl text-[0.9rem] leading-[1.9] font-light text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
