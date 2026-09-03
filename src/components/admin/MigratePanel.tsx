import { useEffect, useState } from "react";
import { toast } from "sonner";

import { legacyLocalCatalog } from "@/data/catalog/repository";
import { mergeImportedRows } from "@/data/catalog/store";
import type { ProductInput } from "@/data/catalog/types";

/**
 * One-time migration for a catalog that was saved in this browser before the
 * cloud database existed. Nothing is uploaded automatically and nothing is
 * deleted until the upload has succeeded.
 */
export function MigratePanel() {
  const [pending, setPending] = useState<ProductInput[] | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setPending(legacyLocalCatalog.read());
  }, []);

  if (!pending || pending.length === 0) return null;

  const upload = async () => {
    setBusy(true);
    try {
      const outcome = await mergeImportedRows(pending.map((row) => {
        const { id: _ignored, ...rest } = row;
        return rest as ProductInput;
      }));
      if (outcome.saved > 0) {
        legacyLocalCatalog.clear();
        setPending(null);
        toast.success(
          `${outcome.saved} product${outcome.saved === 1 ? "" : "s"} moved to the cloud catalog.`,
        );
      }
      if (outcome.failures.length) {
        toast.error(`${outcome.failures.length} record(s) could not be moved.`);
      }
    } catch {
      toast.error("The upload failed. Your browser copy has been kept.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      aria-labelledby="migrate-heading"
      className="border border-gold/25 bg-onyx/40 p-6 sm:p-8"
    >
      <h2 id="migrate-heading" className="text-[0.62rem] font-light tracking-[0.3em] text-gold uppercase">
        Products saved in this browser
      </h2>
      <p className="mt-4 max-w-2xl text-[0.8rem] leading-relaxed font-light text-muted-foreground">
        {pending.length} product{pending.length === 1 ? "" : "s"} from the earlier browser-only
        catalog {pending.length === 1 ? "is" : "are"} still stored on this device. Move them into
        the cloud catalog so they are available everywhere. Your browser copy is kept until the
        upload succeeds.
      </p>
      <button
        type="button"
        disabled={busy}
        onClick={() => void upload()}
        className="mt-6 inline-flex border border-gold bg-gold px-8 py-3 text-[0.6rem] font-light tracking-[0.26em] text-primary-foreground uppercase transition-colors hover:bg-gold-soft disabled:opacity-60"
      >
        {busy ? "Moving…" : "Move to cloud catalog"}
      </button>
    </section>
  );
}
