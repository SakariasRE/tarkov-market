type ErrorMessageProps = {
  message: string | null;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className="mb-4 rounded-lg border border-red-900 bg-red-950 px-4 py-3 text-sm text-red-300"
    >
      {message}
    </p>
  );
}

export default ErrorMessage;
