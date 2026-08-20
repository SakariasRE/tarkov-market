type ModeToggleProps = {
  isRegister: boolean;
  disabled: boolean;
  onToggle: () => void;
};

function ModeToggle({ isRegister, disabled, onToggle }: ModeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className="mt-5 w-full text-sm text-neutral-400 underline transition hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
    >
      {isRegister
        ? "Har du redan ett konto? Logga in"
        : "Inget konto? Skapa ett här"}
    </button>
  );
}

export default ModeToggle;
