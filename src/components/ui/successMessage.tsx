type SuccessMessageProps = {
  message: string | null;
};

function SuccessMessage({ message }: SuccessMessageProps) {
  if (!message) return null;

  return (
    <p
      aria-live="polite"
      className="rounded-lg border border-emerald-900 bg-emerald-950 px-4 py-3 text-sm text-emerald-300"
    >
      {message}
    </p>
  );
}

export default SuccessMessage;
