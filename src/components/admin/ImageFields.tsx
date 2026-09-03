import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, ImageOff, Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

import { TextField } from "./AdminField";
import { uploadProductImage } from "@/lib/product-images";
import type { ImageDraft } from "@/data/catalog/admin-form";

interface ImageFieldsProps {
  images: ImageDraft[];
  onChange: (images: ImageDraft[]) => void;
}

const buttonClass =
  "inline-flex items-center gap-2 border border-gold/25 px-3 py-2 text-[0.58rem] font-light tracking-[0.22em] text-ivory uppercase transition-colors hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-40";

/**
 * Gallery editor. The first image is the main product image; the rest follow
 * in order. Photographs can be uploaded to the project's secure image storage,
 * or referenced by an external URL.
 */
export function ImageFields({ images, onChange }: ImageFieldsProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    const added: ImageDraft[] = [];
    for (const file of Array.from(files)) {
      try {
        const url = await uploadProductImage(file);
        added.push({ url, alt: "" });
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "That image could not be uploaded.");
      }
    }
    setUploading(false);
    if (added.length) {
      onChange([...images, ...added]);
      toast.success(`${added.length} image${added.length === 1 ? "" : "s"} uploaded.`);
    }
  };

  const update = (index: number, patch: Partial<ImageDraft>) =>
    onChange(images.map((image, i) => (i === index ? { ...image, ...patch } : image)));

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    const next = [...images];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved!);
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-[0.7rem] leading-relaxed font-light text-muted-foreground">
        The first image is the main product image. Upload your own photographs, or paste an image
        URL. Add alt text for each photograph so the shop stays readable with a screen reader.
        Products with no image show a labelled placeholder — no stock imagery is ever added for you.
      </p>

      {images.length === 0 && (
        <div className="flex items-center gap-3 border border-dashed border-gold/20 px-4 py-6 text-[0.7rem] font-light text-muted-foreground">
          <ImageOff className="h-4 w-4 text-gold/60" strokeWidth={1.25} aria-hidden="true" />
          No images added. The product will show a labelled &ldquo;image to be added&rdquo;
          placeholder.
        </div>
      )}

      <ul className="flex flex-col gap-5">
        {images.map((image, index) => (
          <li key={index} className="border border-gold/15 p-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden border border-gold/15 bg-onyx/40">
                {image.url ? (
                  <img
                    src={image.url}
                    alt={image.alt || `Product image ${index + 1} preview`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="px-2 text-center text-[0.5rem] font-light tracking-[0.18em] text-muted-foreground uppercase">
                    Preview
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-4">
                <TextField
                  label={index === 0 ? "Main image URL" : `Image ${index + 1} URL`}
                  value={image.url}
                  onChange={(url) => update(index, { url })}
                  placeholder="https://…"
                  required={false}
                />
                <TextField
                  label="Alt text"
                  value={image.alt}
                  onChange={(alt) => update(index, { alt })}
                  placeholder="Describe the photograph for screen readers"
                  required={false}
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className={buttonClass}
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label={`Move image ${index + 1} earlier`}
              >
                <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" /> Up
              </button>
              <button
                type="button"
                className={buttonClass}
                onClick={() => move(index, 1)}
                disabled={index === images.length - 1}
                aria-label={`Move image ${index + 1} later`}
              >
                <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" /> Down
              </button>
              <button
                type="button"
                className={buttonClass}
                onClick={() => onChange(images.filter((_, i) => i !== index))}
                aria-label={`Remove image ${index + 1}`}
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" /> Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={buttonClass}
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          <Upload className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
          {uploading ? "Uploading…" : "Upload images"}
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => onChange([...images, { url: "", alt: "" }])}
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" /> Add image URL
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          aria-label="Choose product images to upload"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length) void handleFiles(files);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
