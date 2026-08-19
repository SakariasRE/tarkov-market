type StatusPanelProps = {
  message: string;
  isBusy?: boolean;
};

function StatusPanel({ message, isBusy }: StatusPanelProps) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-8 text-center">
      <p
        className={isBusy ? "text-neutral-300" : "text-neutral-400"}
        aria-live="polite"
      >
        {message}
      </p>
    </div>
  );
}

export default StatusPanel;
