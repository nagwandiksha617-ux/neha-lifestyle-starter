import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CouponField } from "@/components/checkout/CouponField";
import { Field } from "@/components/checkout/Field";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { PaymentMethodSelect } from "@/components/checkout/PaymentMethodSelect";
import { WhatsAppOrderButton } from "@/components/checkout/WhatsAppOrderButton";
import { useCartLines } from "@/components/shop/useCartLines";
import { formatPrice, subcategoryName } from "@/data/products";
import { CURRENCY } from "@/lib/commerce/config";
import {
  clearCheckoutDraft,
  readCheckoutDraft,
  writeCheckoutDraft,
} from "@/lib/commerce/checkout-draft";
import { canPlaceOrder, paymentMethods, type PaymentMethodId } from "@/lib/commerce/payments";
import { calculateTotals } from "@/lib/commerce/pricing";
import { generateOrderReference, saveOrder, type Order } from "@/lib/commerce/order";
import {
  emptyCheckoutValues,
  validateCheckout,
  type CheckoutErrors,
  type CheckoutFormValues,
} from "@/lib/commerce/validation";
import { useShop } from "@/lib/shop-store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/checkout")({
  head: () =>
    pageHead({
      title: "Checkout | Neha Lifestyle",
      description: "Complete your Neha Lifestyle order.",
      path: "/checkout",
      robots: "noindex, nofollow",
      breadcrumbs: [{ name: "Checkout", path: "/checkout" }],
    }),
  component: CheckoutPage,
});

const primaryButton =
  "inline-flex min-h-12 w-full items-center justify-center bg-gold px-6 text-[0.65rem] font-medium tracking-[0.26em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";
const outlineButton =
  "inline-flex min-h-12 w-full items-center justify-center border border-gold/35 px-6 text-[0.62rem] font-medium tracking-[0.24em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";
const sectionCard = "border border-gold/15 bg-card/30 p-6 sm:p-8";
const sectionTitle = "font-display text-xl font-light tracking-[0.04em] text-ivory";

type Step = "details" | "review";

function CheckoutPage() {
  const navigate = useNavigate();
  const { hydrated, clearCart } = useShop();
  const { lines, subtotal } = useCartLines();

  const [values, setValues] = useState<CheckoutFormValues>(emptyCheckoutValues);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [method, setMethod] = useState<PaymentMethodId | null>(null);
  const [methodError, setMethodError] = useState<string | undefined>(undefined);
  const [step, setStep] = useState<Step>("details");
  const [notice, setNotice] = useState<string | null>(null);
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(null);

  // Restore the draft after hydration so a refresh never loses typed data.
  useEffect(() => {
    setValues(readCheckoutDraft());
  }, []);

  const update = (key: keyof CheckoutFormValues) => (value: string) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      writeCheckoutDraft(next);
      return next;
    });
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const discount = coupon ? Math.min(coupon.discount, subtotal) : 0;
  const totals = calculateTotals(subtotal, discount);

  const goToReview = () => {
    setNotice(null);
    const nextErrors = validateCheckout(values);
    setErrors(nextErrors);
    if (!method) setMethodError("Select a payment method to continue.");
    else setMethodError(undefined);

    if (Object.keys(nextErrors).length > 0 || !method) {
      setNotice("Please correct the highlighted details before continuing.");
      return;
    }
    setStep("review");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const placeOrder = () => {
    setNotice(null);

    if (lines.length === 0) {
      setNotice("Your cart is empty, so no order was placed.");
      return;
    }
    const nextErrors = validateCheckout(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStep("details");
      setNotice("Some details need correcting. Your order has not been placed.");
      return;
    }

    const outcome = canPlaceOrder(method);
    if (outcome.kind !== "ok") {
      setNotice(outcome.message);
      return;
    }

    const orderId = generateOrderReference();
    const order: Order = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: { fullName: values.fullName, email: values.email, mobile: values.mobile },
      shippingAddress: {
        line1: values.line1,
        street: values.street,
        ...(values.landmark ? { landmark: values.landmark } : {}),
        city: values.city,
        state: values.state,
        pincode: values.pincode,
        country: values.country,
      },
      items: lines.map(({ product, quantity, lineTotal }) => ({
        productId: product.id,
        name: product.name,
        subcategory: subcategoryName(product.subcategory),
        unitPrice: lineTotal / Math.max(quantity, 1),
        quantity,
        lineTotal,
      })),
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping ?? 0,
      total: totals.total,
      currency: CURRENCY,
      paymentMethod: method as PaymentMethodId,
      paymentStatus: "unpaid-cod",
      orderStatus: "placed-locally",
      ...(coupon ? { couponCode: coupon.code } : {}),
    };

    if (!saveOrder(order)) {
      setNotice("We could not save your order on this device. Please try again, or order on WhatsApp.");
      return;
    }

    clearCart();
    clearCheckoutDraft();
    void navigate({ to: "/order/$reference", params: { reference: orderId } });
  };

  if (!hydrated) {
    return <main className="mx-auto min-h-[50vh] w-full max-w-[84rem] px-5 py-16" />;
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto w-full max-w-[64rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <Breadcrumbs items={[{ label: "Cart", to: "/cart" }, { label: "Checkout", to: "/checkout" }]} />
        <SectionHeading as="h1" eyebrow="Checkout" title="Checkout" description="There is nothing to check out yet." />
        <div className="mt-12 flex justify-center">
          <Link
            to="/shop"
            className="inline-flex min-h-12 items-center border border-gold/40 px-7 text-[0.65rem] font-medium tracking-[0.26em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  const summary = (
    <OrderSummary
      totals={totals}
      couponCode={coupon?.code ?? ""}
      lines={lines.map(({ product, quantity, lineTotal }) => ({
        id: product.id,
        name: product.name,
        quantity,
        lineTotal,
      }))}
    >
      <CouponField
        subtotal={subtotal}
        appliedCode={coupon?.code ?? null}
        onApply={(code, value) => setCoupon({ code, discount: value })}
        onRemove={() => setCoupon(null)}
      />
    </OrderSummary>
  );

  return (
    <main className="mx-auto w-full max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <Breadcrumbs items={[{ label: "Cart", to: "/cart" }, { label: "Checkout", to: "/checkout" }]} />
      <SectionHeading
        as="h1"
        eyebrow={step === "details" ? "Checkout" : "Order Review"}
        title={step === "details" ? "Delivery & Payment" : "Review Your Order"}
        description={
          step === "details"
            ? "Enter your details, choose how you would like to pay, then review before placing the order."
            : "Please confirm everything below before placing your order."
        }
      />

      <p role="status" aria-live="polite" className="sr-only">
        {step === "details" ? "Step 1 of 2: delivery and payment details." : "Step 2 of 2: order review."}
      </p>

      {notice ? (
        <div
          role="alert"
          className="mt-8 border border-gold/40 bg-card/60 p-4 text-[0.78rem] leading-relaxed font-light text-ivory"
        >
          <span aria-hidden="true">⚠ </span>
          {notice}
        </div>
      ) : null}

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
        <div className="flex flex-col gap-8">
          {step === "details" ? (
            <>
              <section className={sectionCard} aria-labelledby="customer-info">
                <h2 id="customer-info" className={sectionTitle}>
                  Customer Information
                </h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Full Name"
                    value={values.fullName}
                    onChange={update("fullName")}
                    {...(errors.fullName ? { error: errors.fullName } : {})}
                    autoComplete="name"
                    className="sm:col-span-2"
                  />
                  <Field
                    label="Email"
                    type="email"
                    inputMode="email"
                    value={values.email}
                    onChange={update("email")}
                    {...(errors.email ? { error: errors.email } : {})}
                    autoComplete="email"
                  />
                  <Field
                    label="Mobile Number"
                    type="tel"
                    inputMode="tel"
                    value={values.mobile}
                    onChange={update("mobile")}
                    {...(errors.mobile ? { error: errors.mobile } : {})}
                    autoComplete="tel"
                    placeholder="10-digit mobile number"
                  />
                </div>
              </section>

              <section className={sectionCard} aria-labelledby="shipping-address">
                <h2 id="shipping-address" className={sectionTitle}>
                  Shipping Address
                </h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field
                    label="House / Flat / Building"
                    value={values.line1}
                    onChange={update("line1")}
                    {...(errors.line1 ? { error: errors.line1 } : {})}
                    autoComplete="address-line1"
                    className="sm:col-span-2"
                  />
                  <Field
                    label="Street / Area"
                    value={values.street}
                    onChange={update("street")}
                    {...(errors.street ? { error: errors.street } : {})}
                    autoComplete="address-line2"
                    className="sm:col-span-2"
                  />
                  <Field
                    label="Landmark"
                    required={false}
                    value={values.landmark ?? ""}
                    onChange={update("landmark")}
                    {...(errors.landmark ? { error: errors.landmark } : {})}
                    className="sm:col-span-2"
                  />
                  <Field
                    label="City"
                    value={values.city}
                    onChange={update("city")}
                    {...(errors.city ? { error: errors.city } : {})}
                    autoComplete="address-level2"
                  />
                  <Field
                    label="State"
                    value={values.state}
                    onChange={update("state")}
                    {...(errors.state ? { error: errors.state } : {})}
                    autoComplete="address-level1"
                  />
                  <Field
                    label="PIN Code"
                    inputMode="numeric"
                    maxLength={6}
                    value={values.pincode}
                    onChange={update("pincode")}
                    {...(errors.pincode ? { error: errors.pincode } : {})}
                    autoComplete="postal-code"
                  />
                  <Field
                    label="Country"
                    value={values.country}
                    onChange={update("country")}
                    {...(errors.country ? { error: errors.country } : {})}
                    autoComplete="country-name"
                  />
                </div>
              </section>

              <section className={sectionCard} aria-labelledby="payment-method-section">
                <h2 id="payment-method-section" className="sr-only">
                  Payment Method
                </h2>
                <PaymentMethodSelect
                  value={method}
                  onChange={(next) => {
                    setMethod(next);
                    setMethodError(undefined);
                  }}
                  {...(methodError ? { error: methodError } : {})}
                />
              </section>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={goToReview} className={primaryButton}>
                  Review Order
                </button>
                <Link to="/cart" className={outlineButton}>
                  Back to Cart
                </Link>
              </div>
            </>
          ) : (
            <>
              <section className={sectionCard} aria-labelledby="review-items">
                <h2 id="review-items" className={sectionTitle}>
                  Items
                </h2>
                <ul className="mt-5 divide-y divide-gold/10 border-y border-gold/10">
                  {lines.map(({ product, quantity, lineTotal }) => (
                    <li key={product.id} className="flex items-baseline justify-between gap-4 py-4">
                      <span className="min-w-0">
                        <span className="block truncate text-[0.85rem] font-light text-ivory">
                          {product.name}
                        </span>
                        <span className="text-[0.68rem] font-light text-muted-foreground">
                          {subcategoryName(product.subcategory)} · Qty {quantity} ·{" "}
                          {formatPrice(lineTotal / Math.max(quantity, 1), product.currency)} each
                        </span>
                      </span>
                      <span className="shrink-0 text-[0.85rem] font-light text-gold">
                        {formatPrice(lineTotal, product.currency)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className={sectionCard} aria-labelledby="review-details">
                <h2 id="review-details" className={sectionTitle}>
                  Delivery Details
                </h2>
                <dl className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-[0.6rem] tracking-[0.26em] text-muted-foreground uppercase">Contact</dt>
                    <dd className="mt-2 text-[0.82rem] leading-relaxed font-light text-ivory">
                      {values.fullName}
                      <br />
                      {values.email}
                      <br />
                      {values.mobile}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.6rem] tracking-[0.26em] text-muted-foreground uppercase">
                      Shipping Address
                    </dt>
                    <dd className="mt-2 text-[0.82rem] leading-relaxed font-light text-ivory">
                      {values.line1}
                      <br />
                      {values.street}
                      {values.landmark ? (
                        <>
                          <br />
                          {values.landmark}
                        </>
                      ) : null}
                      <br />
                      {values.city}, {values.state} {values.pincode}
                      <br />
                      {values.country}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.6rem] tracking-[0.26em] text-muted-foreground uppercase">
                      Payment Method
                    </dt>
                    <dd className="mt-2 text-[0.82rem] font-light text-ivory">
                      {paymentMethods.find((m) => m.id === method)?.label ?? "Not selected"}
                    </dd>
                  </div>
                </dl>
              </section>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={placeOrder} className={primaryButton}>
                  Place Order
                </button>
                <button type="button" onClick={() => setStep("details")} className={outlineButton}>
                  Edit Details
                </button>
              </div>

              <div className="sm:max-w-sm">
                <WhatsAppOrderButton
                  lines={lines.map(({ product, quantity, lineTotal }) => ({
                    name: product.name,
                    quantity,
                    lineTotal,
                  }))}
                  total={totals.total}
                  {...(values.fullName ? { customerName: values.fullName } : {})}
                />
              </div>
            </>
          )}
        </div>

        <aside aria-labelledby="order-summary-heading" className="h-fit lg:sticky lg:top-28">
          {summary}
        </aside>
      </div>
    </main>
  );
}
