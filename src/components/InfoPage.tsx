import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { SectionHeading } from "./SectionHeading";

interface InfoPageProps {
  eyebrow?: string;
  /** The page's single H1. */
  title: string;
  description: string;
  breadcrumbs: Crumb[];
  /** Optional content-ready subsections, each rendered with an H2. */
  sections?: Array<{ heading: string; body: string }>;
  children?: ReactNode;
}

/**
 * Shared shell for informational pages (FAQ, journal, policies). Sections are
 * genuine structure only — no invented policy terms or business facts.
 */
export function InfoPage({
  eyebrow,
  title,
  description,
  breadcrumbs,
  sections,
  children,
}: InfoPageProps) {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
      <Breadcrumbs items={breadcrumbs} />

      <SectionHeading
        as="h1"
        eyebrow={eyebrow}
        title={title}
        description={description}
        className="mx-auto"
      />

      {sections && sections.length > 0 && (
        <div className="mt-16 flex flex-col divide-y divide-gold/10 border-y border-gold/10">
          {sections.map((section) => (
            <section key={section.heading} className="py-8">
              <h2 className="font-display text-xl leading-tight font-light tracking-[0.06em] text-ivory">
                {section.heading}
              </h2>
              <p className="mt-4 text-[0.88rem] leading-[1.95] font-light text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      )}

      {children}
    </main>
  );
}
