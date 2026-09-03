import { z } from "zod";

/**
 * Checkout validation. Only the fields required to fulfil an order are
 * collected — no payment credentials of any kind.
 */
export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Enter your full name." })
    .max(100, { message: "Name must be under 100 characters." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Enter your email address." })
    .email({ message: "Enter a valid email address, for example name@example.com." })
    .max(255, { message: "Email must be under 255 characters." }),
  mobile: z
    .string()
    .trim()
    .regex(/^(\+91[- ]?)?[6-9]\d{9}$/, {
      message: "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.",
    }),
  line1: z
    .string()
    .trim()
    .min(1, { message: "Enter your house, flat or building." })
    .max(120, { message: "Keep this under 120 characters." }),
  street: z
    .string()
    .trim()
    .min(1, { message: "Enter your street or area." })
    .max(120, { message: "Keep this under 120 characters." }),
  landmark: z.string().trim().max(120, { message: "Keep this under 120 characters." }).optional(),
  city: z
    .string()
    .trim()
    .min(1, { message: "Enter your city." })
    .max(80, { message: "Keep this under 80 characters." }),
  state: z
    .string()
    .trim()
    .min(1, { message: "Enter your state." })
    .max(80, { message: "Keep this under 80 characters." }),
  pincode: z
    .string()
    .trim()
    .regex(/^[1-9]\d{5}$/, { message: "Enter a valid 6-digit Indian PIN code." }),
  country: z.string().trim().min(1, { message: "Enter your country." }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const emptyCheckoutValues: CheckoutFormValues = {
  fullName: "",
  email: "",
  mobile: "",
  line1: "",
  street: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
};

export type CheckoutErrors = Partial<Record<keyof CheckoutFormValues, string>>;

/** Returns field-level messages; empty object means the form is valid. */
export function validateCheckout(values: CheckoutFormValues): CheckoutErrors {
  const parsed = checkoutSchema.safeParse(values);
  if (parsed.success) return {};
  const errors: CheckoutErrors = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0] as keyof CheckoutFormValues | undefined;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}
