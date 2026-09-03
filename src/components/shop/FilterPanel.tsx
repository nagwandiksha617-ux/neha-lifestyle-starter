import {
  allSubcategories,
  categories,
  formatPrice,
  stockStatusLabels,
  type CategorySlug,
  type StockStatus,
} from "@/data/products";
import { clearFacetFilters, countActiveFilters, type CatalogFacets, type FilterState } from "./filters";

interface FilterPanelProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  /** Facets derived from the products in scope — drives what is rendered. */
  facets: CatalogFacets;
  /** Show the category filter (hidden on single-category pages). */
  showCategories: boolean;
  idPrefix?: string;
}

const ratingOptions = [4.5, 4, 3.5];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

const legendClass = "text-[0.6rem] font-light tracking-[0.32em] text-gold-soft uppercase";
const rowClass =
  "flex min-h-9 cursor-pointer items-center gap-3 text-[0.78rem] font-light text-ivory/80 transition-colors duration-300 hover:text-gold";
const inputClass =
  "h-4 w-4 shrink-0 accent-[var(--gold)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

export function FilterPanel({
  filters,
  onChange,
  facets,
  showCategories,
  idPrefix = "f",
}: FilterPanelProps) {
  const active = countActiveFilters(filters);
  const subcats = allSubcategories.filter((s) => facets.subcategories.includes(s.slug));
  const cats = categories.filter((c) => facets.categories.includes(c.slug));
  const priceCeiling = Math.max(facets.priceCeiling, 1000);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[0.6rem] font-light tracking-[0.36em] text-gold uppercase">Filters</h2>
        <button
          type="button"
          onClick={() => onChange(clearFacetFilters(filters))}
          disabled={active === 0}
          className="min-h-9 text-[0.6rem] font-light tracking-[0.24em] text-muted-foreground uppercase transition-colors duration-300 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-40 disabled:hover:text-muted-foreground"
        >
          Clear all
        </button>
      </div>

      {showCategories && cats.length > 1 && (
        <fieldset className="flex flex-col gap-3">
          <legend className={legendClass}>Category</legend>
          {cats.map((cat) => (
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
                  onChange({ ...filters, subcategories: toggle(filters.subcategories, sub.slug) })
                }
              />
              {sub.name}
            </label>
          ))}
        </fieldset>
      )}

      {(facets.hasNewArrivals || facets.hasBestSellers) && (
        <fieldset className="flex flex-col gap-3">
          <legend className={legendClass}>Collections</legend>
          {facets.hasNewArrivals && (
            <label className={rowClass} htmlFor={`${idPrefix}-new`}>
              <input
                id={`${idPrefix}-new`}
                type="checkbox"
                className={inputClass}
                checked={filters.newArrivalOnly}
                onChange={() => onChange({ ...filters, newArrivalOnly: !filters.newArrivalOnly })}
              />
              New arrivals
            </label>
          )}
          {facets.hasBestSellers && (
            <label className={rowClass} htmlFor={`${idPrefix}-best`}>
              <input
                id={`${idPrefix}-best`}
                type="checkbox"
                className={inputClass}
                checked={filters.bestSellerOnly}
                onChange={() => onChange({ ...filters, bestSellerOnly: !filters.bestSellerOnly })}
              />
              Best sellers
            </label>
          )}
        </fieldset>
      )}

      {facets.hasPrices && (
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
      )}

      {facets.colors.length > 1 && (
        <fieldset className="flex flex-col gap-3">
          <legend className={legendClass}>Colour</legend>
          {facets.colors.map((color) => (
            <label key={color} className={rowClass} htmlFor={`${idPrefix}-colour-${color}`}>
              <input
                id={`${idPrefix}-colour-${color}`}
                type="checkbox"
                className={inputClass}
                checked={filters.colors.includes(color)}
                onChange={() => onChange({ ...filters, colors: toggle(filters.colors, color) })}
              />
              {color}
            </label>
          ))}
        </fieldset>
      )}

      {facets.materials.length > 1 && (
        <fieldset className="flex flex-col gap-3">
          <legend className={legendClass}>Material</legend>
          {facets.materials.map((material) => (
            <label key={material} className={rowClass} htmlFor={`${idPrefix}-mat-${material}`}>
              <input
                id={`${idPrefix}-mat-${material}`}
                type="checkbox"
                className={inputClass}
                checked={filters.materials.includes(material)}
                onChange={() =>
                  onChange({ ...filters, materials: toggle(filters.materials, material) })
                }
              />
              {material}
            </label>
          ))}
        </fieldset>
      )}

      {facets.stockStatuses.length > 1 && (
        <fieldset className="flex flex-col gap-3">
          <legend className={legendClass}>Availability</legend>
          {facets.stockStatuses.map((status) => (
            <label key={status} className={rowClass} htmlFor={`${idPrefix}-av-${status}`}>
              <input
                id={`${idPrefix}-av-${status}`}
                type="checkbox"
                className={inputClass}
                checked={filters.stockStatuses.includes(status)}
                onChange={() =>
                  onChange({
                    ...filters,
                    stockStatuses: toggle<StockStatus>(filters.stockStatuses, status),
                  })
                }
              />
              {stockStatusLabels[status]}
            </label>
          ))}
        </fieldset>
      )}

      {facets.hasRatings && (
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
              {value} &amp; above
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
      )}
    </div>
  );
}
