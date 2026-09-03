import { useRef, useState } from "react";
import { toast } from "sonner";

import {
  CSV_COLUMNS,
  buildCsvTemplate,
  downloadFile,
  exportCatalogCsv,
  exportCatalogJson,
  parseProductsCsv,
} from "@/data/catalog/csv";
import { mergeImportedRows, type ImportIssue, type Product, type ProductInput } from "@/data/products";

interface CsvPanelProps {
  products: Product[];
  rows: ProductInput[];
}

const buttonClass =
  "inline-flex items-center justify-center border border-gold/25 px-6 py-3 text-[0.58rem] font-light tracking-[0.24em] text-ivory uppercase transition-colors hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

/** CSV template download, catalog export and validated import. */
export function CsvPanel({ products, rows }: CsvPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [issues, setIssues] = useState<ImportIssue[]>([]);
  const [imported, setImported] = useState<number | null>(null);

  const handleFile = async (file: File) => {
    const text = await file.text();
    const result = parseProductsCsv(text);
    setIssues(result.issues);
    setImported(result.products.length);

    if (result.products.length === 0) {
      toast.error("Nothing was imported. Check the issues listed below.");
      return;
    }
    // Re-serialise the validated products back to rows so the store keeps a
    // single canonical shape for export.
    toast.info("Importing…");
    const outcome = await mergeImportedRows(
      result.products.map((p) => ({
        ...p,
        productName: p.name,
        fullDescription: p.description,
        colour: p.color,
      })) as ProductInput[],
    );
    setImported(outcome.saved);
    if (outcome.failures.length) {
      setIssues([
        ...result.issues,
        ...outcome.failures.map((f, i) => ({
          index: result.products.length + i,
          identifier: f.identifier,
          reason: f.reason,
        })),
      ]);
    }
    if (outcome.saved === 0) {
      toast.error("Nothing was imported. Check the issues listed below.");
      return;
    }
    toast.success(
      `${outcome.saved} product${outcome.saved === 1 ? "" : "s"} imported.` +
        (result.issues.length + outcome.failures.length
          ? ` ${result.issues.length + outcome.failures.length} row(s) skipped.`
          : ""),
    );
  };

  return (
    <section aria-labelledby="csv-heading" className="border border-gold/15 p-6 sm:p-8">
      <h2 id="csv-heading" className="text-[0.62rem] font-light tracking-[0.3em] text-gold uppercase">
        CSV template, import &amp; export
      </h2>
      <p className="mt-4 max-w-2xl text-[0.78rem] leading-relaxed font-light text-muted-foreground">
        Download the template, fill in your real products, then import it. Rows are validated before
        anything is saved: a row with an unknown category or subcategory, a missing name, or a URL
        that clashes with another product is skipped and listed below rather than half-imported.
      </p>
      <p className="mt-3 max-w-2xl text-[0.68rem] leading-relaxed font-light text-muted-foreground/80">
        Format notes: comma separated, standard double-quote escaping, one product per row. Use
        <code className="mx-1 text-gold-soft">|</code> between multiple values in the images,
        imageAlts, tags and seoKeywords columns. Imported products keep their status column, so you
        can import everything as drafts and publish later.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className={buttonClass}
          onClick={() => downloadFile("neha-lifestyle-catalog-template.csv", buildCsvTemplate(), "text/csv")}
        >
          Download CSV template
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => inputRef.current?.click()}
        >
          Import CSV
        </button>
        <button
          type="button"
          className={buttonClass}
          disabled={products.length === 0}
          onClick={() => downloadFile("neha-lifestyle-catalog.csv", exportCatalogCsv(products), "text/csv")}
        >
          Export catalog CSV
        </button>
        <button
          type="button"
          className={buttonClass}
          disabled={rows.length === 0}
          onClick={() => downloadFile("neha-lifestyle-catalog.json", exportCatalogJson(rows), "application/json")}
        >
          Export JSON
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="sr-only"
          aria-label="Choose a CSV file to import"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
            e.target.value = "";
          }}
        />
      </div>

      <details className="mt-6">
        <summary className="cursor-pointer text-[0.6rem] font-light tracking-[0.22em] text-muted-foreground uppercase">
          Column reference
        </summary>
        <p className="mt-3 text-[0.7rem] leading-relaxed font-light break-words text-muted-foreground">
          {CSV_COLUMNS.join(", ")}
        </p>
      </details>

      {imported != null && (
        <div aria-live="polite" className="mt-6 text-[0.75rem] font-light text-muted-foreground">
          Last import: {imported} product{imported === 1 ? "" : "s"} added or updated
          {issues.length > 0 ? `, ${issues.length} row(s) skipped.` : "."}
        </div>
      )}

      {issues.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2 border border-destructive/30 p-4">
          {issues.map((issue, i) => (
            <li key={i} className="text-[0.72rem] font-light text-destructive">
              Row {issue.index + 2}
              {issue.identifier ? ` (${issue.identifier})` : ""}: {issue.reason}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
