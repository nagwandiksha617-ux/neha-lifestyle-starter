import { useId, type ReactNode } from "react";

const labelClass =
  "text-[0.58rem] font-light tracking-[0.26em] text-muted-foreground uppercase";
const controlClass =
  "w-full rounded-none border border-gold/20 bg-transparent px-4 py-3 text-[0.85rem] font-light text-ivory placeholder:text-muted-foreground/50 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

interface BaseProps {
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  required?: boolean | undefined;
  className?: string | undefined;
}

function Shell({
  label,
  hint,
  error,
  required = true,
  className = "",
  id,
  children,
}: BaseProps & { id: string; children: ReactNode }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className={labelClass}>
        {label} <span className="text-gold-soft">{required ? "(required)" : "(optional)"}</span>
      </label>
      {children}
      {hint && !error && (
        <p className="text-[0.65rem] font-light text-muted-foreground/70">{hint}</p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[0.7rem] font-light text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextFieldProps extends BaseProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string | undefined;
  inputMode?: "text" | "numeric" | "decimal" | undefined;
  multiline?: boolean | undefined;
  rows?: number | undefined;
}

export function TextField({
  value,
  onChange,
  placeholder,
  inputMode,
  multiline,
  rows = 4,
  ...rest
}: TextFieldProps) {
  const id = useId();
  const shared = {
    id,
    value,
    placeholder,
    className: controlClass,
    "aria-invalid": rest.error ? (true as const) : undefined,
    "aria-describedby": rest.error ? `${id}-error` : undefined,
    onChange: (e: { target: { value: string } }) => onChange(e.target.value),
  };
  return (
    <Shell {...rest} id={id}>
      {multiline ? <textarea {...shared} rows={rows} /> : <input {...shared} inputMode={inputMode} />}
    </Shell>
  );
}

interface SelectFieldProps extends BaseProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string | undefined;
}

export function SelectField({ value, onChange, options, placeholder, ...rest }: SelectFieldProps) {
  const id = useId();
  return (
    <Shell {...rest} id={id}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={rest.error ? true : undefined}
        aria-describedby={rest.error ? `${id}-error` : undefined}
        className={`${controlClass} appearance-none`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-background">
            {option.label}
          </option>
        ))}
      </select>
    </Shell>
  );
}

interface ToggleFieldProps {
  label: string;
  description?: string | undefined;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ToggleField({ label, description, checked, onChange }: ToggleFieldProps) {
  const id = useId();
  return (
    <div className="flex items-start gap-3 border border-gold/15 px-4 py-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 accent-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      />
      <label htmlFor={id} className="flex flex-col gap-1">
        <span className="text-[0.62rem] font-light tracking-[0.22em] text-ivory uppercase">
          {label}
        </span>
        {description && (
          <span className="text-[0.68rem] font-light text-muted-foreground">{description}</span>
        )}
      </label>
    </div>
  );
}

export const adminControlClass = controlClass;
export const adminLabelClass = labelClass;
