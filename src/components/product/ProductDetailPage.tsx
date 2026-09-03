import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, MessageCircle, Star } from "lucide-react";
import { toast } from "sonner";

import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductGallery } from "./ProductGallery";
import { ProductAccordion } from "./ProductAccordion";
import { QuantitySelector } from "./QuantitySelector";
import { RecentlyViewed } from "./RecentlyViewed";
import { useShop } from "@/lib/shop-store";
import { openWhatsAppOrder } from "@/lib/whatsapp";
import { isWhatsAppConfigured } from "@/config/business";
import {
  formatPrice,
  getRelatedProducts,
  productPath,
  subcategoryName,
  type Product,
} from "@/data/products";

interface ProductDetailPageProps {
  product: Product;
  breadcrumbs: Crumb[];
}

const primaryButton =
  "min-h-12 w-full bg-gold px-6 py-3.5 text-[0.65rem] font-medium tracking-[0.28em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40";
const outlineButton =
  "min-h-12 w-full border border-gold/40 px-6 py-3.5 text-[0.65rem] font-medium tracking-[0.28em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gold";

export function ProductDetailPage({ product, breadcrumbs }: ProductDetailPageProps) {
  const navigate = useNavigate();
  const { addToCart, setCartOpen, toggleWishlist, isWishlisted, hydrated } = useShop();
  const [quantity, setQuantity] = useState(1);

  const wishlisted = hydrated && isWishlisted(product.id);
  const soldOut = product.availability === "out-of-stock";
  const related = getRelatedProducts(product, 4);
  const whatsAppReady = isWhatsAppConfigured();

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    void navigate({ to: "/checkout" });
  };

  const handleWhatsApp = () => {
    const opened = openWhatsAppOrder({ product, quantity });
    if (!opened) {
      toast("WhatsApp ordering is not configured yet.", {
        description: "The business WhatsApp number will be added soon.",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-[84rem] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <Breadcrumbs items={breadcrumbs} />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ProductGallery product={product} />

        <div className="flex flex-col">
          <p className="text-[0.55rem] font-light tracking-[0.32em] text-gold-soft/80 uppercase">
            {subcategoryName(product.subcategory)}
          </p>
          <h1 className="mt-4 font-display text-3xl leading-tight font-light tracking-[0.06em] text-ivory sm:text-4xl">
            {product.name}
          </h1>
          <span aria-hidden="true" className="mt-5 block h-px w-16 bg-gold/40" />

          <p className="mt-6 text-[0.9rem] leading-relaxed font-light text-muted-foreground">
            {product.shortDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-baseline gap-4">
            <span className="text-xl font-light tracking-[0.12em] text-gold">
              {formatPrice(product.salePrice ?? product.price, product.currency)}
            </span>
            {product.compareAtPrice != null && (
              <span className="text-sm font-light tracking-[0.12em] text-muted-foreground/70 line-through">
                {formatPrice(product.compareAtPrice, product.currency)}
              </span>
            )}
            <span className="text-[0.55rem] font-light tracking-[0.26em] text-muted-foreground/70 uppercase">
              Placeholder price
            </span>
          </div>

          <dl className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.7rem] font-light tracking-[0.14em] text-muted-foreground">
            <div className="flex items-center gap-2">
              <dt className="sr-only">Availability</dt>
              <dd className={soldOut ? "text-ivory/70" : "text-gold"}>
                {soldOut ? "Out of stock" : "In stock"}
                <span className="sr-only"> — placeholder status</span>
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="sr-only">Rating</dt>
              <dd className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-gold" strokeWidth={1.25} fill="currentColor" aria-hidden="true" />
                {product.rating.toFixed(1)} · {product.reviewCount} reviews
                <span className="sr-only"> — placeholder rating</span>
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="text-muted-foreground/70">SKU</dt>
              <dd className="text-ivory/80">{product.sku ?? "SKU placeholder"}</dd>
            </div>
          </dl>

          <div className="mt-9">
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              itemLabel={product.name}
              id={`qty-${product.slug}`}
            />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button type="button" className={primaryButton} disabled={soldOut} onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button type="button" className={outlineButton} disabled={soldOut} onClick={handleBuyNow}>
              Buy Now
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={wishlisted}
              className={`${outlineButton} flex items-center justify-center gap-2.5`}
            >
              <Heart
                className="h-4 w-4"
                strokeWidth={1.25}
                fill={wishlisted ? "currentColor" : "none"}
                aria-hidden="true"
              />
              {wishlisted ? "In Wishlist" : "Add to Wishlist"}
            </button>
            <button
              type="button"
              onClick={handleWhatsApp}
              aria-disabled={!whatsAppReady}
              title={whatsAppReady ? undefined : "WhatsApp ordering is not configured yet"}
              className={`${outlineButton} flex items-center justify-center gap-2.5 ${whatsAppReady ? "" : "opacity-50"}`}
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
              Order on WhatsApp
            </button>
          </div>

          <p className="mt-5 text-[0.62rem] leading-relaxed font-light tracking-[0.1em] text-muted-foreground/70">
            Pricing, availability, ratings and specifications shown here are placeholders for this
            demo catalogue entry.
          </p>

          <ProductAccordion product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="you-may-also-like" className="mt-20 lg:mt-28">
          <h2
            id="you-may-also-like"
            className="font-display text-2xl font-light tracking-[0.08em] text-ivory sm:text-3xl"
          >
            You May Also Like
          </h2>
          <span aria-hidden="true" className="mt-4 block h-px w-16 bg-gold/40" />
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {related.map((item) => (
              <li key={item.id}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <RecentlyViewed currentProductId={product.id} />

      {/* Mobile sticky purchase bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-gold/20 bg-onyx/95 px-4 py-3 backdrop-blur-sm lg:hidden">
        <button type="button" className={outlineButton} disabled={soldOut} onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button type="button" className={primaryButton} disabled={soldOut} onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
      <div aria-hidden="true" className="h-20 lg:hidden" />

      <p className="sr-only">
        <Link to={productPath(product) as never}>Permanent link to {product.name}</Link>
      </p>
    </div>
  );
}
