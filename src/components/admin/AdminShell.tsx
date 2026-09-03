import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { useAdminSession } from "@/hooks/useAdminSession";

interface AdminShellProps {
  title: string;
  intro?: string;
  action?: ReactNode;
  children: ReactNode;
}

/**
 * Layout for the catalog manager.
 *
 * Access is decided by the database: only accounts holding the admin role can
 * read drafts or change the catalog, and every save is checked server-side by
 * row-level security rather than by this layout.
 */
export function AdminShell({ title, intro, action, children }: AdminShellProps) {
  const { session, signOut } = useAdminSession();

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
      <nav aria-label="Catalog manager" className="mb-8 flex flex-wrap items-center gap-5">
        <Link
          to="/admin"
          className="text-[0.58rem] font-light tracking-[0.26em] text-muted-foreground uppercase transition-colors hover:text-gold"
        >
          Catalog
        </Link>
        <Link
          to="/admin/products/new"
          className="text-[0.58rem] font-light tracking-[0.26em] text-muted-foreground uppercase transition-colors hover:text-gold"
        >
          Add product
        </Link>
        <Link
          to="/shop"
          className="text-[0.58rem] font-light tracking-[0.26em] text-muted-foreground uppercase transition-colors hover:text-gold"
        >
          View storefront
        </Link>
        <span className="ml-auto flex items-center gap-4">
          {session?.user.email && (
            <span className="text-[0.58rem] font-light tracking-[0.2em] text-muted-foreground">
              {session.user.email}
            </span>
          )}
          <button
            type="button"
            onClick={() => void signOut()}
            className="text-[0.58rem] font-light tracking-[0.26em] text-muted-foreground uppercase transition-colors hover:text-gold"
          >
            Sign out
          </button>
        </span>
      </nav>

      <div
        role="note"
        className="mb-10 flex gap-3 border border-gold/25 bg-onyx/40 px-5 py-4 text-[0.75rem] leading-relaxed font-light text-muted-foreground"
      >
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} aria-hidden="true" />
        <p>
          <strong className="font-normal text-ivory">Administrator area.</strong> Products are
          stored in the shop&rsquo;s cloud database, so they stay available on every device and to
          every administrator. Drafts are hidden from customers until you publish them.
        </p>
      </div>

      <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[0.55rem] font-light tracking-[0.32em] text-gold uppercase">
            Neha Lifestyle
          </p>
          <h1 className="mt-3 font-display text-4xl font-light tracking-[0.1em] text-ivory">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 max-w-2xl text-[0.85rem] leading-relaxed font-light text-muted-foreground">
              {intro}
            </p>
          )}
        </div>
        {action}
      </header>

      <div className="flex flex-col gap-10">{children}</div>
    </div>
  );
}
