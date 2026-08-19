type FormFieldProps = {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
};

function FormField({ id, label, hint, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-neutral-200">
        {label}
      </label>

      {children}

      {hint && <p className="text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}

export default FormField;
