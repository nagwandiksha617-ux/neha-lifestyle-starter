import { useNavigate } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { useShop } from "@/lib/shop-store";
import { formatPrice, type Product } from "@/data/products";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
  className?: string;
  imageLoading?: "lazy" | "eager";
}

export function ProductCard({ product, className, imageLoading }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart, setCartOpen, toggleWishlist, isWishlisted, hydrated } = useShop();

  const wishlisted = hydrated && isWishlisted(product.id);
  const soldOut = product.availability === "out-of-stock";
  const discount =
    product.salePrice != null
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0;

  const handleBuyNow = () => {
    addToCart(product.id);
    void navigate({ to: "/checkout" });
  };

  return (
    <article
      className={cn(
        "group flex h-full flex-col border border-gold/12 bg-card/40 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-gold/40",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <ProductImage product={product} {...(imageLoading ? { loading: imageLoading } : {})} />

        {discount > 0 && (
          <span className="absolute top-4 left-4 bg-gold px-3 py-1 text-[0.55rem] font-medium tracking-[0.22em] text-primary-foreground uppercase">
            {discount}% Off
          </span>
        )}
        {soldOut && (
          <span className="absolute bottom-4 left-4 border border-gold/40 bg-onyx/80 px-3 py-1 text-[0.55rem] font-light tracking-[0.22em] text-ivory/80 uppercase">
            Out of stock
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wishlisted}
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className={cn(
            "absolute top-4 right-4 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/30 bg-onyx/70 backdrop-blur-sm transition-colors duration-500 hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
            wishlisted ? "text-gold" : "text-ivory/70",
          )}
        >
          <Heart
            className="h-4 w-4"
            strokeWidth={1.25}
            fill={wishlisted ? "currentColor" : "none"}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 py-6 sm:px-6">
        <span className="text-[0.55rem] font-light tracking-[0.32em] text-gold-soft/80 uppercase">
          {product.subcategory.replace(/-/g, " ")}
        </span>

        <h3 className="font-display text-lg leading-tight font-light tracking-[0.05em] text-ivory">
          {product.name}
        </h3>

        <p className="text-[0.72rem] leading-relaxed font-light text-muted-foreground">
          {product.shortDescription}
        </p>

        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-sm font-light tracking-[0.12em] text-gold">
            {formatPrice(product.salePrice ?? product.price, product.currency)}
          </span>
          {product.salePrice != null && (
            <span className="text-[0.72rem] font-light tracking-[0.12em] text-muted-foreground/70 line-through">
              {formatPrice(product.price, product.currency)}
            </span>
          )}
        </div>

        <p className="flex items-center gap-1.5 text-[0.68rem] font-light tracking-[0.14em] text-muted-foreground">
          <Star className="h-3.5 w-3.5 text-gold" strokeWidth={1.25} fill="currentColor" aria-hidden="true" />
          <span>
            {product.rating.toFixed(1)}
            <span className="sr-only"> out of 5 — demo rating</span>
          </span>
          <span aria-hidden="true" className="text-muted-foreground/50">·</span>
          <span>{product.reviewCount} reviews</span>
        </p>

        <div className="mt-auto flex flex-col gap-2.5 pt-3">
          <button
            type="button"
            disabled={soldOut}
            onClick={() => {
              addToCart(product.id);
              setCartOpen(true);
            }}
            className="min-h-11 w-full border border-gold/40 px-5 py-3 text-[0.65rem] font-medium tracking-[0.28em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gold"
          >
            Add to Cart
          </button>
          <button
            type="button"
            disabled={soldOut}
            onClick={handleBuyNow}
            className="min-h-11 w-full bg-gold px-5 py-3 text-[0.65rem] font-medium tracking-[0.28em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 sm:opacity-100 lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-focus-within:opacity-100 lg:group-hover:opacity-100"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
