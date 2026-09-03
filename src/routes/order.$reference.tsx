import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { WhatsAppOrderButton } from "@/components/checkout/WhatsAppOrderButton";
import { formatPrice } from "@/data/products";
import { getOrder, type Order } from "@/lib/commerce/order";
import { paymentMethods } from "@/lib/commerce/payments";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/order/$reference")({
  head: () =>
    pageHead({
      title: "Order Confirmation | Neha Lifestyle",
      description: "Your Neha Lifestyle order details.",
      path: "/order",
      robots: "noindex, nofollow",
    }),
  component: OrderConfirmationPage,
});

const sectionCard = "border border-gold/15 bg-card/30 p-6 sm:p-8";
const outlineButton =
  "inline-flex min-h-12 items-center justify-center border border-gold/40 px-7 text-[0.62rem] font-medium tracking-[0.24em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

function OrderConfirmationPage() {
  const { reference } = Route.useParams();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  // Orders live in local storage only, so read them after hydration.
  useEffect(() => {
    setOrder(getOrder(reference) ?? null);
  }, [reference]);

  if (order === undefined) {
    return <main className="mx-auto min-h-[50vh] w-full max-w-[64rem] px-5 py-16" />;
  }

  if (order === null) {
    return (
      <main className="mx-auto w-full max-w-[64rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <Breadcrumbs items={[{ label: "Cart", to: "/cart" }]} />
        <SectionHeading
          as="h1"
          eyebrow="Order"
          title="Order Not Found"
          description="We could not find this order on this device. Orders are saved locally until online ordering is connected."
        />
        <div className="mt-12 flex justify-center">
          <Link to="/shop" className={outlineButton}>
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  const paymentLabel = paymentMethods.find((m) => m.id === order.paymentMethod)?.label ?? order.paymentMethod;
  const awaitingPayment = order.orderStatus === "awaiting-payment";

  return (
    <main className="mx-auto w-full max-w-[64rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <Breadcrumbs items={[{ label: "Cart", to: "/cart" }]} />
      <SectionHeading
        as="h1"
        eyebrow="Order"
        title={awaitingPayment ? "Payment Required" : "Thank you for your order."}
        description={
          awaitingPayment
            ? "This order has not been paid. Online payment is not connected yet, so nothing has been charged."
            : "Your order has been recorded. We will confirm the details with you before dispatch."
        }
      />

      <p role="status" aria-live="polite" className="sr-only">
        {awaitingPayment ? "Order awaiting payment." : "Order placed successfully."}
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
        <div className="flex flex-col gap-8">
          <section className={sectionCard} aria-labelledby="order-reference">
            <h2 id="order-reference" className="text-[0.6rem] tracking-[0.3em] text-gold-soft uppercase">
              Order Reference
            </h2>
            <p className="mt-3 font-display text-2xl font-light tracking-[0.06em] text-gold">{order.orderId}</p>
            <p className="mt-3 text-[0.72rem] leading-relaxed font-light text-muted-foreground">
              Placed on {new Date(order.createdAt).toLocaleString("en-IN")} · Payment method: {paymentLabel} ·
              Payment status: {order.paymentStatus === "unpaid-cod" ? "Payable on delivery" : "Pending"}
            </p>
          </section>

          <section className={sectionCard} aria-labelledby="order-items">
            <h2 id="order-items" className="font-display text-xl font-light tracking-[0.04em] text-ivory">
              Items
            </h2>
            <ul className="mt-5 divide-y divide-gold/10 border-y border-gold/10">
              {order.items.map((item) => (
                <li key={item.productId} className="flex items-baseline justify-between gap-4 py-4">
                  <span className="min-w-0">
                    <span className="block truncate text-[0.85rem] font-light text-ivory">{item.name}</span>
                    <span className="text-[0.68rem] font-light text-muted-foreground">
                      {item.subcategory} · Qty {item.quantity} · {formatPrice(item.unitPrice)} each
                    </span>
                  </span>
                  <span className="shrink-0 text-[0.85rem] font-light text-gold">
                    {formatPrice(item.lineTotal)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className={sectionCard} aria-labelledby="order-delivery">
            <h2 id="order-delivery" className="font-display text-xl font-light tracking-[0.04em] text-ivory">
              Delivery Address
            </h2>
            <p className="mt-4 text-[0.82rem] leading-relaxed font-light text-ivory">
              {order.customer.fullName}
              <br />
              {order.shippingAddress.line1}
              <br />
              {order.shippingAddress.street}
              {order.shippingAddress.landmark ? (
                <>
                  <br />
                  {order.shippingAddress.landmark}
                </>
              ) : null}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
              <br />
              {order.shippingAddress.country}
              <br />
              {order.customer.email} · {order.customer.mobile}
            </p>
          </section>

          <div className="flex flex-wrap gap-3">
            <Link to="/shop" className={outlineButton}>
              Continue Shopping
            </Link>
          </div>
        </div>

        <aside aria-labelledby="order-summary-heading" className="h-fit">
          <OrderSummary
            title="Order Total"
            totals={{
              subtotal: order.subtotal,
              discount: order.discount,
              shipping: order.shipping > 0 ? order.shipping : null,
              total: order.total,
            }}
            {...(order.couponCode ? { couponCode: order.couponCode } : {})}
          >
            <div className="mt-6">
              <WhatsAppOrderButton
                lines={order.items.map((item) => ({
                  name: item.name,
                  quantity: item.quantity,
                  lineTotal: item.lineTotal,
                }))}
                total={order.total}
                customerName={order.customer.fullName}
                reference={order.orderId}
              />
            </div>
          </OrderSummary>
        </aside>
      </div>
    </main>
  );
}
