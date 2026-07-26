interface FormFieldProps {
  label: string;
  placeholder: string;
  name: string;
  error?: string;
  type?: string;
}

export function FormField({ label, placeholder, name, error, type = 'text' }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-xs">
      <label className="text-label-medium text-on-surface-variant">{label}</label>
      <input
        name={name}
        type={type}
        className={`w-full rounded-lg border p-2 text-on-surface outline-none transition-colors duration-200 focus:ring-2 ${
          error
            ? 'border-danger focus:border-danger focus:ring-danger/30'
            : 'border-outline-variant hover:border-outline focus:border-secondary focus:ring-secondary/30'
        }`}
        placeholder={placeholder}
      />
      {error && <p className="text-caption text-danger">{error}</p>}
    </div>
  );
}
