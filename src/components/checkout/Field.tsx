import { useId } from "react";

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: "text" | "email" | "tel";
  inputMode?: "text" | "email" | "tel" | "numeric";
  autoComplete?: string;
  maxLength?: number;
  placeholder?: string;
  className?: string;
}

/** Labelled, screen-reader-friendly checkout input with inline error text. */
export function Field({
  label,
  value,
  onChange,
  error,
  required = true,
  type = "text",
  inputMode,
  autoComplete,
  maxLength,
  placeholder,
  className = "",
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-[0.6rem] font-light tracking-[0.26em] text-muted-foreground uppercase">
        {label}{" "}
        <span className="text-gold-soft">{required ? "(required)" : "(optional)"}</span>
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`min-h-12 w-full border bg-background/60 px-3.5 text-[0.85rem] font-light text-ivory transition-colors placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
          error ? "border-ivory/70" : "border-gold/25"
        }`}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-[0.72rem] font-light text-ivory">
          <span aria-hidden="true">⚠ </span>
          {error}
        </p>
      ) : null}
    </div>
  );
}
