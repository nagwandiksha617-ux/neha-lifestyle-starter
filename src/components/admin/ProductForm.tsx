import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { SelectField, TextField, ToggleField } from "./AdminField";
import { ImageFields } from "./ImageFields";
import {
  emptyProductForm,
  suggestCanonicalUrl,
  suggestSeoDescription,
  suggestSeoTitle,
  suggestSlug,
  validateProductForm,
  type ProductForm as ProductFormValues,
  type ProductFormErrors,
} from "@/data/catalog/admin-form";
import { categories, stockStatusLabels, subcategoriesOf, upsertProductRow } from "@/data/products";
import type { CategorySlug, Product, StockStatus } from "@/data/products";

interface ProductFormProps {
  initial?: ProductFormValues;
  existing: Product[];
  heading: string;
}

const sectionClass = "border border-gold/15 p-6 sm:p-8";
const sectionTitleClass =
  "text-[0.62rem] font-light tracking-[0.3em] text-gold uppercase";
const gridClass = "mt-6 grid gap-5 sm:grid-cols-2";

const primaryButton =
  "inline-flex items-center justify-center border border-gold bg-gold px-8 py-3 text-[0.6rem] font-light tracking-[0.26em] text-primary-foreground uppercase transition-colors hover:bg-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";
const ghostButton =
  "inline-flex items-center justify-center border border-gold/25 px-8 py-3 text-[0.6rem] font-light tracking-[0.26em] text-ivory uppercase transition-colors hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

const stockOptions = (Object.keys(stockStatusLabels) as StockStatus[]).map((value) => ({
  value,
  label: stockStatusLabels[value],
}));

/**
 * Add / edit form for one catalog record. Nothing is saved unless every
 * validation rule passes, and errors are announced inline next to their field.
 */
export function ProductForm({ initial, existing, heading }: ProductFormProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState<ProductFormValues>(initial ?? emptyProductForm());
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [summary, setSummary] = useState<string | null>(null);

  const set = <K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const subcategoryOptions = useMemo(
    () =>
      (form.category ? subcategoriesOf(form.category as CategorySlug) : []).map((s) => ({
        value: s.slug,
        label: s.name,
      })),
    [form.category],
  );

  const applySeoDefaults = () => {
    setForm((prev) => ({
      ...prev,
      slug: prev.slug || suggestSlug(prev),
      seoTitle: prev.seoTitle || suggestSeoTitle(prev),
      seoDescription: prev.seoDescription || suggestSeoDescription(prev),
      canonicalUrl: prev.canonicalUrl || suggestCanonicalUrl(prev),
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = validateProductForm(form, existing);
    setErrors(result.errors);
    const count = Object.keys(result.errors).length;
    if (count > 0 || !result.row) {
      setSummary(`This product was not saved. Fix ${count} field${count === 1 ? "" : "s"} below.`);
      return;
    }
    setSummary(null);
    upsertProductRow(result.row);
    toast.success(
      form.status === "published"
        ? "Product saved and published to the storefront."
        : "Product saved as a draft. Drafts stay hidden from the storefront.",
    );
    void navigate({ to: "/admin" });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <h1 className="font-display text-3xl font-light tracking-[0.12em] text-ivory">{heading}</h1>

      {summary && (
        <p
          role="alert"
          className="border border-destructive/40 bg-destructive/10 px-5 py-4 text-[0.78rem] font-light text-destructive"
        >
          {summary}
        </p>
      )}

      <section className={sectionClass} aria-labelledby="section-basic">
        <h2 id="section-basic" className={sectionTitleClass}>
          Basic information
        </h2>
        <div className={gridClass}>
          <TextField
            label="Product name"
            value={form.productName}
            onChange={(v) => set("productName", v)}
            error={errors.productName}
            className="sm:col-span-2"
          />
          <SelectField
            label="Category"
            value={form.category}
            onChange={(v) => setForm((p) => ({ ...p, category: v as CategorySlug, subcategory: "" }))}
            options={categories.map((c) => ({ value: c.slug, label: c.name }))}
            placeholder="Select a category"
            error={errors.category}
          />
          <SelectField
            label="Subcategory"
            value={form.subcategory}
            onChange={(v) => set("subcategory", v)}
            options={subcategoryOptions}
            placeholder={form.category ? "Select a subcategory" : "Choose a category first"}
            error={errors.subcategory}
          />
          <TextField
            label="URL slug"
            value={form.slug}
            onChange={(v) => set("slug", v)}
            required={false}
            hint="Leave blank to generate it from the product name."
            error={errors.slug}
          />
          <TextField
            label="SKU"
            value={form.sku}
            onChange={(v) => set("sku", v)}
            required={false}
            hint="Your own code, e.g. NL-BAG-001."
            error={errors.sku}
          />
          <TextField
            label="Short description"
            value={form.shortDescription}
            onChange={(v) => set("shortDescription", v)}
            required={false}
            multiline
            rows={3}
            className="sm:col-span-2"
          />
          <TextField
            label="Full description"
            value={form.fullDescription}
            onChange={(v) => set("fullDescription", v)}
            required={false}
            multiline
            rows={6}
            className="sm:col-span-2"
          />
        </div>
      </section>

      <section className={sectionClass} aria-labelledby="section-pricing">
        <h2 id="section-pricing" className={sectionTitleClass}>
          Pricing
        </h2>
        <div className={gridClass}>
          <TextField
            label="Price (INR)"
            value={form.price}
            onChange={(v) => set("price", v)}
            required={false}
            inputMode="decimal"
            hint="Leave blank to show “Price on request”."
            error={errors.price}
          />
          <TextField
            label="Compare-at price (INR)"
            value={form.compareAtPrice}
            onChange={(v) => set("compareAtPrice", v)}
            required={false}
            inputMode="decimal"
            hint="Shown struck through. Must be higher than the price."
            error={errors.compareAtPrice}
          />
          <SelectField
            label="Currency"
            value={form.currency}
            onChange={() => undefined}
            options={[{ value: "INR", label: "Indian Rupee (INR)" }]}
            required={false}
          />
          <ToggleField
            label="Price includes tax"
            description="Turn off if your prices are exclusive of tax."
            checked={form.taxInclusive}
            onChange={(v) => set("taxInclusive", v)}
          />
        </div>
      </section>

      <section className={sectionClass} aria-labelledby="section-inventory">
        <h2 id="section-inventory" className={sectionTitleClass}>
          Inventory
        </h2>
        <div className={gridClass}>
          <SelectField
            label="Stock status"
            value={form.stockStatus}
            onChange={(v) => set("stockStatus", v as StockStatus)}
            options={stockOptions}
          />
          <TextField
            label="Stock quantity"
            value={form.stockQuantity}
            onChange={(v) => set("stockQuantity", v)}
            required={false}
            inputMode="numeric"
            error={errors.stockQuantity}
          />
          <TextField
            label="Low stock threshold"
            value={form.lowStockThreshold}
            onChange={(v) => set("lowStockThreshold", v)}
            required={false}
            inputMode="numeric"
            hint="The catalog list flags a product at or below this quantity."
            error={errors.lowStockThreshold}
          />
        </div>
      </section>

      <section className={sectionClass} aria-labelledby="section-attributes">
        <h2 id="section-attributes" className={sectionTitleClass}>
          Attributes
        </h2>
        <div className={gridClass}>
          <TextField label="Material" value={form.material} onChange={(v) => set("material", v)} required={false} />
          <TextField label="Colour" value={form.colour} onChange={(v) => set("colour", v)} required={false} />
          <TextField label="Size" value={form.size} onChange={(v) => set("size", v)} required={false} />
          <TextField label="Dimensions" value={form.dimensions} onChange={(v) => set("dimensions", v)} required={false} />
          <TextField label="Weight" value={form.weight} onChange={(v) => set("weight", v)} required={false} />
          <TextField
            label="Care instructions"
            value={form.careInstructions}
            onChange={(v) => set("careInstructions", v)}
            required={false}
            multiline
            rows={3}
            className="sm:col-span-2"
          />
          <TextField
            label="Tags"
            value={form.tags}
            onChange={(v) => set("tags", v)}
            required={false}
            hint="Comma separated. Used by search and related products."
            className="sm:col-span-2"
          />
        </div>
      </section>

      <section className={sectionClass} aria-labelledby="section-shipping">
        <h2 id="section-shipping" className={sectionTitleClass}>
          Shipping &amp; returns
        </h2>
        <div className={gridClass}>
          <TextField
            label="Shipping information"
            value={form.shippingInformation}
            onChange={(v) => set("shippingInformation", v)}
            required={false}
            multiline
            rows={3}
          />
          <TextField
            label="Return information"
            value={form.returnInformation}
            onChange={(v) => set("returnInformation", v)}
            required={false}
            multiline
            rows={3}
          />
        </div>
      </section>

      <section className={sectionClass} aria-labelledby="section-images">
        <h2 id="section-images" className={sectionTitleClass}>
          Images
        </h2>
        <div className="mt-6">
          <ImageFields images={form.images} onChange={(images) => set("images", images)} />
        </div>
      </section>

      <section className={sectionClass} aria-labelledby="section-status">
        <h2 id="section-status" className={sectionTitleClass}>
          Status
        </h2>
        <div className={gridClass}>
          <SelectField
            label="Publication"
            value={form.status}
            onChange={(v) => set("status", v as ProductFormValues["status"])}
            options={[
              { value: "draft", label: "Draft — hidden from the storefront" },
              { value: "published", label: "Published — visible on the storefront" },
            ]}
          />
          <div className="grid gap-3">
            <ToggleField label="Featured" checked={form.featured} onChange={(v) => set("featured", v)} />
            <ToggleField label="New arrival" checked={form.newArrival} onChange={(v) => set("newArrival", v)} />
            <ToggleField label="Best seller" checked={form.bestSeller} onChange={(v) => set("bestSeller", v)} />
          </div>
        </div>
      </section>

      <section className={sectionClass} aria-labelledby="section-seo">
        <h2 id="section-seo" className={sectionTitleClass}>
          Search engine listing
        </h2>
        <p className="mt-4 text-[0.7rem] font-light text-muted-foreground">
          Leave these blank and sensible defaults are generated from the product name and
          description. Structured data only ever publishes the details you enter here — no ratings,
          reviews or offers are invented.
        </p>
        <div className={gridClass}>
          <TextField
            label="SEO title"
            value={form.seoTitle}
            onChange={(v) => set("seoTitle", v)}
            required={false}
            placeholder={suggestSeoTitle(form)}
            className="sm:col-span-2"
          />
          <TextField
            label="Meta description"
            value={form.seoDescription}
            onChange={(v) => set("seoDescription", v)}
            required={false}
            multiline
            rows={3}
            placeholder={suggestSeoDescription(form)}
            className="sm:col-span-2"
          />
          <TextField
            label="SEO keywords"
            value={form.seoKeywords}
            onChange={(v) => set("seoKeywords", v)}
            required={false}
            hint="Comma separated."
          />
          <TextField
            label="Canonical URL"
            value={form.canonicalUrl}
            onChange={(v) => set("canonicalUrl", v)}
            required={false}
            placeholder={suggestCanonicalUrl(form)}
            error={errors.canonicalUrl}
          />
        </div>
        <button type="button" className={`${ghostButton} mt-6`} onClick={applySeoDefaults}>
          Fill blanks with suggestions
        </button>
      </section>

      <div className="flex flex-wrap gap-4">
        <button type="submit" className={primaryButton}>
          Save product
        </button>
        <button type="button" className={ghostButton} onClick={() => void navigate({ to: "/admin" })}>
          Cancel
        </button>
      </div>
    </form>
  );
}
