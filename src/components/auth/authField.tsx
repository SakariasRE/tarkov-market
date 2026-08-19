type AuthFieldProps = {
  id: string;
  label: string;
  type: string;
  value: string;
  autoComplete: string;
  disabled: boolean;
  hint?: string;
  onChange: (value: string) => void;
};

function AuthField({
  id,
  label,
  type,
  value,
  autoComplete,
  disabled,
  hint,
  onChange,
}: AuthFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-neutral-200">
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        disabled={disabled}
        required
        className="border border-neutral-700 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-amber-200 focus-visible:ring-2 focus-visible:ring-amber-300 disabled:opacity-60"
      />

      {hint && <p className="text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}

export default AuthField;
