type ConditionFieldProps = {
  conditions: string[];
  value: string;
  onChange: (value: string) => void;
};

function ConditionField({ conditions, value, onChange }: ConditionFieldProps) {
  return (
    <div>
      <label
        htmlFor="condition"
        className="mb-2 block text-sm font-medium text-neutral-300"
      >
        Condition
      </label>

      <select
        id="condition"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
      >
        {conditions.map((condition) => (
          <option key={condition} value={condition}>
            {condition}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ConditionField;
