import { useState, type FormEvent, type ReactNode } from "react";

import { useAdminSession } from "@/hooks/useAdminSession";

const shell =
  "mx-auto w-full max-w-md border border-gold/15 bg-onyx/40 px-6 py-10 sm:px-10";

/**
 * Authentication gate for the catalog manager.
 *
 * This decides what is rendered; it is not the security boundary. Products,
 * images and drafts are protected in the database, so a signed-out or
 * non-administrator visitor cannot read or change them even if they reach
 * these screens.
 */
export function AdminGate({ children }: { children: ReactNode }) {
  const { session, isAdmin, loading, signIn, signOut } = useAdminSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (loading) {
    return (
      <div className="px-6 py-24 text-center text-[0.8rem] font-light tracking-[0.2em] text-muted-foreground uppercase">
        Checking your session…
      </div>
    );
  }

  if (session && isAdmin) return <>{children}</>;

  if (session && !isAdmin) {
    return (
      <div className="px-6 py-24">
        <div className={shell}>
          <h1 className="font-display text-2xl font-light tracking-[0.1em] text-ivory">
            No catalog access
          </h1>
          <p className="mt-4 text-[0.85rem] leading-relaxed font-light text-muted-foreground">
            You are signed in as {session.user.email}, but this account is not an administrator of
            the Neha Lifestyle catalog. Ask an existing administrator to grant access to this
            account.
          </p>
          <button
            type="button"
            onClick={() => void signOut()}
            className="mt-8 inline-flex border border-gold/25 px-8 py-3 text-[0.6rem] font-light tracking-[0.26em] text-ivory uppercase transition-colors hover:border-gold hover:text-gold"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const message = await signIn(email.trim(), password);
    setBusy(false);
    if (message) setError("Those details did not match an account.");
  };

  return (
    <div className="px-6 py-24">
      <form className={shell} onSubmit={submit} noValidate>
        <p className="text-[0.55rem] font-light tracking-[0.32em] text-gold uppercase">
          Neha Lifestyle
        </p>
        <h1 className="mt-3 font-display text-3xl font-light tracking-[0.1em] text-ivory">
          Catalog sign in
        </h1>
        <p className="mt-4 text-[0.85rem] leading-relaxed font-light text-muted-foreground">
          Administrator access only. Customers never need to sign in to shop.
        </p>

        <label
          htmlFor="admin-email"
          className="mt-8 block text-[0.55rem] font-light tracking-[0.26em] text-muted-foreground uppercase"
        >
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-2 w-full border border-gold/20 bg-transparent px-4 py-3 text-[0.9rem] font-light text-ivory focus-visible:border-gold focus-visible:outline-none"
        />

        <label
          htmlFor="admin-password"
          className="mt-6 block text-[0.55rem] font-light tracking-[0.26em] text-muted-foreground uppercase"
        >
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-2 w-full border border-gold/20 bg-transparent px-4 py-3 text-[0.9rem] font-light text-ivory focus-visible:border-gold focus-visible:outline-none"
        />

        {error && (
          <p role="alert" className="mt-4 text-[0.8rem] font-light text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-8 inline-flex w-full items-center justify-center border border-gold bg-gold px-8 py-3 text-[0.6rem] font-light tracking-[0.26em] text-primary-foreground uppercase transition-colors hover:bg-gold-soft disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
