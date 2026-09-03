import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SelectField, TextField } from "./AdminField";
import {
  categoryName,
  deleteProductRows,
  duplicateProductRow,
  patchProductRows,
  priceLabel,
  productPath,
  stockStatusLabels,
  subcategoryName,
  type Product,
} from "@/data/products";

interface CatalogTableProps {
  products: Product[];
}

const actionClass =
  "border border-gold/25 px-3 py-1.5 text-[0.55rem] font-light tracking-[0.2em] text-ivory uppercase transition-colors hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-40";

type SortKey = "recent" | "name" | "category" | "status";

const flagLabels = (product: Product) =>
  [
    product.featured ? "Featured" : null,
    product.newArrival ? "New arrival" : null,
    product.bestSeller ? "Best seller" : null,
  ].filter(Boolean) as string[];

/**
 * Catalog list. Renders as a table on wide screens and as stacked cards on
 * phones, with search, filtering, sorting, bulk actions and confirmed deletes.
 */
export function CatalogTable({ products }: CatalogTableProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<SortKey>("recent");
  const [selected, setSelected] = useState<string[]>([]);
  const [pendingDelete, setPendingDelete] = useState<{ ids: string[]; label: string } | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      if (status && p.status !== status) return false;
      if (category && p.category !== category) return false;
      if (!q) return true;
      return [p.name, p.sku, p.slug, p.category, p.subcategory].some((v) =>
        (v ?? "").toLowerCase().includes(q),
      );
    });
    const sorted = [...list];
    sorted.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "category") return `${a.category}${a.subcategory}`.localeCompare(`${b.category}${b.subcategory}`);
      if (sort === "status") return a.status.localeCompare(b.status);
      return (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "");
    });
    return sorted;
  }, [products, query, status, category, sort]);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));

  const bulk = async (patch: Parameters<typeof patchProductRows>[1], message: string) => {
    if (selected.length === 0) return;
    try {
      await patchProductRows(selected, patch);
      toast.success(message);
      setSelected([]);
    } catch {
      toast.error("That change could not be saved. Please try again.");
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const ids = pendingDelete.ids;
    setPendingDelete(null);
    try {
      await deleteProductRows(ids);
      setSelected((prev) => prev.filter((id) => !ids.includes(id)));
      toast.success(ids.length === 1 ? "Product deleted." : `${ids.length} products deleted.`);
    } catch {
      toast.error("That product could not be deleted. Please try again.");
    }
  };

  if (products.length === 0) {
    return (
      <div className="border border-dashed border-gold/20 px-6 py-16 text-center">
        <p className="font-display text-2xl font-light tracking-[0.12em] text-ivory">
          Your catalog is empty
        </p>
        <p className="mx-auto mt-4 max-w-md text-[0.8rem] leading-relaxed font-light text-muted-foreground">
          Add your first real product, or import a CSV. Nothing is published to the storefront until
          you set a product&rsquo;s status to Published.
        </p>
        <Link
          to="/admin/products/new"
          className="mt-8 inline-flex border border-gold bg-gold px-8 py-3 text-[0.6rem] font-light tracking-[0.26em] text-primary-foreground uppercase transition-colors hover:bg-gold-soft"
        >
          Add product
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <TextField
          label="Search catalog"
          value={query}
          onChange={setQuery}
          required={false}
          placeholder="Name, SKU or category"
        />
        <SelectField
          label="Status"
          value={status}
          onChange={setStatus}
          required={false}
          placeholder="All statuses"
          options={[
            { value: "published", label: "Published" },
            { value: "draft", label: "Draft" },
          ]}
        />
        <SelectField
          label="Category"
          value={category}
          onChange={setCategory}
          required={false}
          placeholder="All categories"
          options={[
            { value: "bags", label: "Bags" },
            { value: "clutches", label: "Clutches" },
            { value: "jewellery", label: "Jewellery" },
          ]}
        />
        <SelectField
          label="Sort by"
          value={sort}
          onChange={(v) => setSort(v as SortKey)}
          required={false}
          options={[
            { value: "recent", label: "Recently updated" },
            { value: "name", label: "Name A–Z" },
            { value: "category", label: "Category" },
            { value: "status", label: "Status" },
          ]}
        />
      </div>

      {selected.length > 0 && (
        <div
          role="region"
          aria-label="Bulk actions"
          className="flex flex-wrap items-center gap-3 border border-gold/20 bg-onyx/40 px-4 py-3"
        >
          <span className="text-[0.6rem] font-light tracking-[0.22em] text-gold uppercase">
            {selected.length} selected
          </span>
          <button type="button" className={actionClass} onClick={() => void bulk({ status: "published" }, "Selected products published.")}>
            Publish
          </button>
          <button type="button" className={actionClass} onClick={() => void bulk({ status: "draft" }, "Selected products moved to draft.")}>
            Unpublish
          </button>
          <button type="button" className={actionClass} onClick={() => void bulk({ newArrival: true }, "Marked as new arrivals.")}>
            Mark new arrival
          </button>
          <button type="button" className={actionClass} onClick={() => void bulk({ bestSeller: true }, "Marked as best sellers.")}>
            Mark best seller
          </button>
          <button
            type="button"
            className={actionClass}
            onClick={() => setPendingDelete({ ids: selected, label: `${selected.length} products` })}
          >
            Delete
          </button>
          <button type="button" className={actionClass} onClick={() => setSelected([])}>
            Clear selection
          </button>
        </div>
      )}

      <p aria-live="polite" className="text-[0.62rem] font-light tracking-[0.22em] text-muted-foreground uppercase">
        {visible.length} of {products.length} products
      </p>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto border border-gold/15 lg:block">
        <table className="w-full min-w-[64rem] border-collapse text-left">
          <caption className="sr-only">Catalog products with status, pricing and stock</caption>
          <thead>
            <tr className="border-b border-gold/15 text-[0.55rem] font-light tracking-[0.24em] text-muted-foreground uppercase">
              <th scope="col" className="px-4 py-4">
                <span className="sr-only">Select</span>
              </th>
              <th scope="col" className="px-4 py-4">Image</th>
              <th scope="col" className="px-4 py-4">Product</th>
              <th scope="col" className="px-4 py-4">Category</th>
              <th scope="col" className="px-4 py-4">SKU</th>
              <th scope="col" className="px-4 py-4">Price</th>
              <th scope="col" className="px-4 py-4">Stock</th>
              <th scope="col" className="px-4 py-4">Status</th>
              <th scope="col" className="px-4 py-4">Flags</th>
              <th scope="col" className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((product) => (
              <tr key={product.id} className="border-b border-gold/10 align-top">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(product.id)}
                    onChange={() => toggle(product.id)}
                    aria-label={`Select ${product.name}`}
                    className="h-4 w-4 accent-gold"
                  />
                </td>
                <td className="px-4 py-4">
                  <ThumbCell product={product} />
                </td>
                <td className="px-4 py-4">
                  <span className="block text-[0.85rem] font-light text-ivory">{product.name}</span>
                  <span className="block text-[0.65rem] font-light text-muted-foreground">
                    {productPath(product)}
                  </span>
                </td>
                <td className="px-4 py-4 text-[0.75rem] font-light text-muted-foreground">
                  {categoryName(product.category)} / {subcategoryName(product.subcategory)}
                </td>
                <td className="px-4 py-4 text-[0.75rem] font-light text-muted-foreground">
                  {product.sku ?? "—"}
                </td>
                <td className="px-4 py-4 text-[0.75rem] font-light text-ivory">{priceLabel(product)}</td>
                <td className="px-4 py-4 text-[0.75rem] font-light text-muted-foreground">
                  <StockCell product={product} />
                </td>
                <td className="px-4 py-4">
                  <StatusPill status={product.status} />
                </td>
                <td className="px-4 py-4 text-[0.65rem] font-light text-muted-foreground">
                  {flagLabels(product).join(", ") || "—"}
                </td>
                <td className="px-4 py-4">
                  <RowActions product={product} onDelete={setPendingDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="flex flex-col gap-4 lg:hidden">
        {visible.map((product) => (
          <li key={product.id} className="border border-gold/15 p-4">
            <div className="flex gap-4">
              <ThumbCell product={product} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[0.85rem] font-light break-words text-ivory">{product.name}</span>
                  <input
                    type="checkbox"
                    checked={selected.includes(product.id)}
                    onChange={() => toggle(product.id)}
                    aria-label={`Select ${product.name}`}
                    className="mt-1 h-4 w-4 shrink-0 accent-gold"
                  />
                </div>
                <p className="mt-1 text-[0.65rem] font-light text-muted-foreground">
                  {categoryName(product.category)} / {subcategoryName(product.subcategory)}
                </p>
                <p className="mt-1 text-[0.7rem] font-light text-ivory/90">{priceLabel(product)}</p>
                <p className="mt-1 text-[0.65rem] font-light text-muted-foreground">
                  SKU {product.sku ?? "—"} · <StockCell product={product} />
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <StatusPill status={product.status} />
                  {flagLabels(product).map((flag) => (
                    <span
                      key={flag}
                      className="border border-gold/20 px-2 py-1 text-[0.5rem] font-light tracking-[0.18em] text-muted-foreground uppercase"
                    >
                      {flag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <RowActions product={product} onDelete={setPendingDelete} />
            </div>
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="border border-dashed border-gold/20 px-6 py-10 text-center text-[0.8rem] font-light text-muted-foreground">
          No products match these filters.
        </p>
      )}

      <AlertDialog open={pendingDelete != null} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {pendingDelete?.label}?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the record from this browser&rsquo;s catalog and from every storefront
              page it appears on. It cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep product</AlertDialogCancel>
            <AlertDialogAction onClick={() => void confirmDelete()}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ThumbCell({ product }: { product: Product }) {
  const image = product.thumbnailImage ?? product.images[0];
  return (
    <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden border border-gold/15 bg-onyx/40">
      {image ? (
        <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <span className="px-1 text-center text-[0.45rem] font-light tracking-[0.14em] text-muted-foreground uppercase">
          No image
        </span>
      )}
    </div>
  );
}

function StockCell({ product }: { product: Product }) {
  const low =
    product.stockQuantity != null &&
    product.lowStockThreshold != null &&
    product.stockQuantity <= product.lowStockThreshold;
  return (
    <span className={low ? "text-destructive" : undefined}>
      {stockStatusLabels[product.stockStatus]}
      {product.stockQuantity != null ? ` · ${product.stockQuantity}` : ""}
      {low ? " · low" : ""}
    </span>
  );
}

function StatusPill({ status }: { status: Product["status"] }) {
  return (
    <span
      className={`inline-block border px-2 py-1 text-[0.5rem] font-light tracking-[0.2em] uppercase ${
        status === "published" ? "border-gold/40 text-gold" : "border-gold/15 text-muted-foreground"
      }`}
    >
      {status === "published" ? "Published" : "Draft"}
    </span>
  );
}

function RowActions({
  product,
  onDelete,
}: {
  product: Product;
  onDelete: (value: { ids: string[]; label: string }) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link to="/admin/products/$id" params={{ id: product.id }} className={actionClass}>
        Edit
      </Link>
      <button
        type="button"
        className={actionClass}
        onClick={() => {
          void duplicateProductRow(product.id)
            .then(() => toast.success("Product duplicated as a draft."))
            .catch(() => toast.error("That product could not be duplicated."));
        }}
      >
        Duplicate
      </button>
      <button
        type="button"
        className={actionClass}
        onClick={() =>
          void patchProductRows([product.id], {
            status: product.status === "published" ? "draft" : "published",
          }).catch(() => toast.error("That change could not be saved."))
        }
      >
        {product.status === "published" ? "Unpublish" : "Publish"}
      </button>
      <button
        type="button"
        className={actionClass}
        onClick={() => onDelete({ ids: [product.id], label: product.name })}
      >
        Delete
      </button>
    </div>
  );
}
