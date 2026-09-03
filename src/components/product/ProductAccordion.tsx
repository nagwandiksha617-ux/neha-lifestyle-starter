import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/data/products";

interface ProductAccordionProps {
  product: Product;
}

/**
 * Expandable product information. Copy is deliberately placeholder-only —
 * no shipping promises, return windows or material claims are asserted.
 */
export function ProductAccordion({ product }: ProductAccordionProps) {
  const specs = product.specifications ?? [];

  const sections = [
    {
      value: "description",
      title: "Description",
      body: <p>{product.description}</p>,
    },
    {
      value: "details",
      title: "Product Details",
      body:
        specs.length > 0 ? (
          <dl className="grid gap-3 sm:grid-cols-2">
            {specs.map((row) => (
              <div key={row.label} className="flex flex-col gap-1 border-b border-gold/10 pb-3">
                <dt className="text-[0.58rem] font-light tracking-[0.26em] text-muted-foreground uppercase">
                  {row.label}
                </dt>
                <dd className="text-[0.85rem] font-light text-ivory/90">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p>Product details to be added.</p>
        ),
    },
    {
      value: "material",
      title: "Material & Care",
      body: (
        <p>
          {product.material}. {product.care ?? "Care instructions to be added."}
        </p>
      ),
    },
    {
      value: "shipping",
      title: "Shipping Information",
      body: <p>Shipping options, timelines and charges will be published here once confirmed.</p>,
    },
    {
      value: "returns",
      title: "Returns &amp; Exchange",
      body: <p>The returns and exchange policy will be published here once confirmed.</p>,
    },
    {
      value: "faqs",
      title: "FAQs",
      body: <p>Frequently asked questions for this piece will be added here.</p>,
    },
  ];

  return (
    <section aria-labelledby="product-information" className="mt-16">
      <h2 id="product-information" className="sr-only">
        Product information
      </h2>
      <Accordion type="single" collapsible defaultValue="description" className="w-full">
        {sections.map((section) => (
          <AccordionItem key={section.value} value={section.value} className="border-gold/12">
            <AccordionTrigger className="py-5 text-left text-[0.68rem] font-light tracking-[0.26em] text-ivory uppercase hover:text-gold hover:no-underline">
              {section.value === "returns" ? "Returns & Exchange" : section.title}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-[0.85rem] leading-relaxed font-light text-muted-foreground">
              {section.body}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
