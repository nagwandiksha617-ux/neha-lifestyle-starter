import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Frontend-only cart and wishlist state, persisted to localStorage.
 *
 * The shape is intentionally minimal (product id + quantity) so it can later be
 * synced to an account/backend without touching any consuming component.
 */

export interface CartLine {
  productId: string;
  quantity: number;
}

const CART_KEY = "nl.cart.v1";
const WISHLIST_KEY = "nl.wishlist.v1";

interface ShopContextValue {
  /** False during SSR and the first client render, so UI stays hydration-safe. */
  hydrated: boolean;
  cart: CartLine[];
  cartCount: number;
  wishlist: string[];
  wishlistCount: number;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode / quota) — state stays in-memory */
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setCart(readJson<CartLine[]>(CART_KEY, []));
    setWishlist(readJson<string[]>(WISHLIST_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeJson(CART_KEY, cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) writeJson(WISHLIST_KEY, wishlist);
  }, [wishlist, hydrated]);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.productId === productId);
      if (existing) {
        return prev.map((line) =>
          line.productId === productId
            ? { ...line, quantity: Math.min(99, line.quantity + quantity) }
            : line,
        );
      }
      return [...prev, { productId, quantity: Math.min(99, Math.max(1, quantity)) }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((line) => line.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((line) => line.productId !== productId)
        : prev.map((line) =>
            line.productId === productId
              ? { ...line, quantity: Math.min(99, quantity) }
              : line,
          ),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  const value = useMemo<ShopContextValue>(
    () => ({
      hydrated,
      cart,
      cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
      wishlist,
      wishlistCount: wishlist.length,
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart,
      isInCart: (id) => cart.some((line) => line.productId === id),
      toggleWishlist,
      isWishlisted: (id) => wishlist.includes(id),
      cartOpen,
      setCartOpen,
    }),
    [
      hydrated,
      cart,
      wishlist,
      cartOpen,
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart,
      toggleWishlist,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
}
