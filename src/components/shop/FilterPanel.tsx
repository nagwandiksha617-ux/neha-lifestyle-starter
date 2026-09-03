import { allSubcategories, categories, formatPrice, type Availability, type CategorySlug } from "@/data/products";
import { countActiveFilters, type FilterState } from "./filters";

interface FilterPanelProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  /** Subcategory slugs available in the current scope; hidden when only one. */
  subcategorySlugs: string[];
  /** Show the category filter (hidden on single-category pages). */
  showCategories: boolean;
  priceCeiling: number;
  idPrefix?: string;
}

const availabilityOptions: Array<{ value: Availability; label: string }> = [
  { value: "in-stock", label: "In stock" },
  { value: "out-of-stock", label: "Out of stock" },
  { value: "pre-order", label: "Pre-order" },
];

const ratingOptions = [4.5, 4, 3.5];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

const legendClass =
  "text-[0.6rem] font-light tracking-[0.32em] text-gold-soft uppercase";
const rowClass =
  "flex min-h-9 cursor-pointer items-center gap-3 text-[0.78rem] font-light text-ivory/80 transition-colors duration-300 hover:text-gold";
const inputClass =
  "h-4 w-4 shrink-0 accent-[var(--gold)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

export function FilterPanel({
  filters,
  onChange,
  subcategorySlugs,
  showCategories,
  priceCeiling,
  idPrefix = "f",
}: FilterPanelProps) {
  const active = countActiveFilters(filters);
  const subcats = allSubcategories.filter((s) => subcategorySlugs.includes(s.slug));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[0.6rem] font-light tracking-[0.36em] text-gold uppercase">
          Filters
        </h2>
        <button
          type="button"
          onClick={() => onChange({ ...filters, ...{ categories: [], subcategories: [], maxPrice: null, availability: [], minRating: null } })}
          disabled={active === 0}
          className="min-h-9 text-[0.6rem] font-light tracking-[0.24em] text-muted-foreground uppercase transition-colors duration-300 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-40 disabled:hover:text-muted-foreground"
        >
          Clear all
        </button>
      </div>

      {showCategories && (
        <fieldset className="flex flex-col gap-3">
          <legend className={legendClass}>Category</legend>
          {categories.map((cat) => (
            <label key={cat.slug} className={rowClass} htmlFor={`${idPrefix}-cat-${cat.slug}`}>
              <input
                id={`${idPrefix}-cat-${cat.slug}`}
                type="checkbox"
                className={inputClass}
                checked={filters.categories.includes(cat.slug)}
                onChange={() =>
                  onChange({
                    ...filters,
                    categories: toggle<CategorySlug>(filters.categories, cat.slug),
                  })
                }
              />
              {cat.name}
            </label>
          ))}
        </fieldset>
      )}

      {subcats.length > 1 && (
        <fieldset className="flex flex-col gap-3">
          <legend className={legendClass}>Subcategory</legend>
          {subcats.map((sub) => (
            <label key={sub.slug} className={rowClass} htmlFor={`${idPrefix}-sub-${sub.slug}`}>
              <input
                id={`${idPrefix}-sub-${sub.slug}`}
                type="checkbox"
                className={inputClass}
                checked={filters.subcategories.includes(sub.slug)}
                onChange={() =>
                  onChange({
                    ...filters,
                    subcategories: toggle(filters.subcategories, sub.slug),
                  })
                }
              />
              {sub.name}
            </label>
          ))}
        </fieldset>
      )}

      <div className="flex flex-col gap-3">
        <label className={legendClass} htmlFor={`${idPrefix}-price`}>
          Price range
        </label>
        <input
          id={`${idPrefix}-price`}
          type="range"
          min={0}
          max={priceCeiling}
          step={100}
          value={filters.maxPrice ?? priceCeiling}
          onChange={(e) => {
            const value = Number(e.target.value);
            onChange({ ...filters, maxPrice: value >= priceCeiling ? null : value });
          }}
          className="w-full accent-[var(--gold)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        />
        <p className="text-[0.7rem] font-light text-muted-foreground">
          Up to {formatPrice(filters.maxPrice ?? priceCeiling)}
        </p>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className={legendClass}>Availability</legend>
        {availabilityOptions.map((opt) => (
          <label key={opt.value} className={rowClass} htmlFor={`${idPrefix}-av-${opt.value}`}>
            <input
              id={`${idPrefix}-av-${opt.value}`}
              type="checkbox"
              className={inputClass}
              checked={filters.availability.includes(opt.value)}
              onChange={() =>
                onChange({
                  ...filters,
                  availability: toggle<Availability>(filters.availability, opt.value),
                })
              }
            />
            {opt.label}
          </label>
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className={legendClass}>Rating</legend>
        {ratingOptions.map((value) => (
          <label key={value} className={rowClass} htmlFor={`${idPrefix}-rate-${value}`}>
            <input
              id={`${idPrefix}-rate-${value}`}
              type="radio"
              name={`${idPrefix}-rating`}
              className={inputClass}
              checked={filters.minRating === value}
              onChange={() => onChange({ ...filters, minRating: value })}
            />
            {value} & above
          </label>
        ))}
        <label className={rowClass} htmlFor={`${idPrefix}-rate-any`}>
          <input
            id={`${idPrefix}-rate-any`}
            type="radio"
            name={`${idPrefix}-rating`}
            className={inputClass}
            checked={filters.minRating === null}
            onChange={() => onChange({ ...filters, minRating: null })}
          />
          Any rating
        </label>
      </fieldset>
    </div>
  );
}
