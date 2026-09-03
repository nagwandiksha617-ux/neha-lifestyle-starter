/**
 * Admin session state.
 *
 * Sign-in is handled by the project's authentication service. Whether a
 * signed-in account may manage the catalog is decided in the database by the
 * `is_admin()` security-definer function, which reads the `user_roles` table.
 * The result is used only to shape the interface — every read and write is
 * independently enforced by row-level security.
 */

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import { refreshCatalog } from "@/data/catalog/store";

export interface AdminSessionState {
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

export function useAdminSession(): AdminSessionState {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const evaluate = async (next: Session | null) => {
      if (!active) return;
      setSession(next);
      if (!next) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.rpc("is_admin");
      if (!active) return;
      setIsAdmin(!error && data === true);
      setLoading(false);
      void refreshCatalog();
    };

    void supabase.auth.getSession().then(({ data }) => evaluate(data.session));

    const { data: subscription } = supabase.auth.onAuthStateChange((event, next) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        void evaluate(next);
      }
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? error.message : null;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    await refreshCatalog();
  }, []);

  return { session, isAdmin, loading, signIn, signOut };
}
