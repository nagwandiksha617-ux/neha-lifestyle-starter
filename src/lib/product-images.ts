/**
 * Product image uploads.
 *
 * Files go to the private `product-images` storage bucket; only signed-in
 * administrators may write to it. The storefront reads them back through the
 * `/api/public/product-image/*` route, so the returned value is a stable path
 * that can be stored on the product record.
 */

import { supabase } from "@/integrations/supabase/client";

const BUCKET = "product-images";
export const IMAGE_PROXY_PREFIX = "/api/public/product-image/";
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

function extensionOf(file: File): string {
  const fromName = file.name.split(".").pop();
  if (fromName && /^[a-zA-Z0-9]{2,5}$/.test(fromName)) return fromName.toLowerCase();
  const fromType = file.type.split("/").pop();
  return fromType && /^[a-z0-9]{2,5}$/.test(fromType) ? fromType : "bin";
}

export async function uploadProductImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Images must be 10MB or smaller.");

  const key = `${crypto.randomUUID()}.${extensionOf(file)}`;
  const { error } = await supabase.storage.from(BUCKET).upload(key, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  });
  if (error) throw new Error(error.message);

  return `${IMAGE_PROXY_PREFIX}${key}`;
}

export async function deleteProductImage(url: string): Promise<void> {
  if (!url.startsWith(IMAGE_PROXY_PREFIX)) return;
  const key = url.slice(IMAGE_PROXY_PREFIX.length);
  if (!key) return;
  await supabase.storage.from(BUCKET).remove([key]);
}
