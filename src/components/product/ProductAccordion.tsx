import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product, SpecRow } from "@/data/products";

interface ProductAccordionProps {
  product: Product;
}

/**
 * Expandable product information. Every section is rendered only when the
 * catalog record actually carries that information — nothing is asserted on
 * the product's behalf.
 */
export function ProductAccordion({ product }: ProductAccordionProps) {
  const details: SpecRow[] = [
    ...(product.material ? [{ label: "Material", value: product.material }] : []),
    ...(product.color ? [{ label: "Colour", value: product.color }] : []),
    ...(product.size ? [{ label: "Size", value: product.size }] : []),
    ...(product.dimensions ? [{ label: "Dimensions", value: product.dimensions }] : []),
    ...(product.weight ? [{ label: "Weight", value: product.weight }] : []),
    ...(product.sku ? [{ label: "SKU", value: product.sku }] : []),
    ...(product.specifications ?? []),
  ];

  const sections: Array<{ value: string; title: string; body: React.ReactNode }> = [];

  if (product.description) {
    sections.push({
      value: "description",
      title: "Description",
      body: <p>{product.description}</p>,
    });
  }

  if (details.length > 0) {
    sections.push({
      value: "details",
      title: "Product Details",
      body: (
        <dl className="grid gap-3 sm:grid-cols-2">
          {details.map((row) => (
            <div key={row.label} className="flex flex-col gap-1 border-b border-gold/10 pb-3">
              <dt className="text-[0.58rem] font-light tracking-[0.26em] text-muted-foreground uppercase">
                {row.label}
              </dt>
              <dd className="text-[0.85rem] font-light text-ivory/90">{row.value}</dd>
            </div>
          ))}
        </dl>
      ),
    });
  }

  if (product.careInstructions) {
    sections.push({
      value: "care",
      title: "Care Instructions",
      body: <p>{product.careInstructions}</p>,
    });
  }

  if (product.shippingInformation) {
    sections.push({
      value: "shipping",
      title: "Shipping Information",
      body: <p>{product.shippingInformation}</p>,
    });
  }

  if (product.returnInformation) {
    sections.push({
      value: "returns",
      title: "Returns & Exchange",
      body: <p>{product.returnInformation}</p>,
    });
  }

  if (sections.length === 0) return null;

  return (
    <section aria-labelledby="product-information" className="mt-16">
      <h2 id="product-information" className="sr-only">
        Product information
      </h2>
      <Accordion type="single" collapsible defaultValue={sections[0]!.value} className="w-full">
        {sections.map((section) => (
          <AccordionItem key={section.value} value={section.value} className="border-gold/12">
            <AccordionTrigger className="py-5 text-left text-[0.68rem] font-light tracking-[0.26em] text-ivory uppercase hover:text-gold hover:no-underline">
              {section.title}
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
