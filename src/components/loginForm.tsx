import { useState } from "react";
import type { AuthUser } from "../api/auth";
import { login, register } from "../api/auth";
import AuthField from "./auth/authField";

type LoginFormProps = {
  isRegister: boolean;
  onSuccess: (user: AuthUser) => void;
};

function LoginForm({ isRegister, onSuccess }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (isRegister && !username.trim()) {
      setError("Ange ett användarnamn.");
      return;
    }

    if (!email.trim() || !password) {
      setError("Ange e-post och lösenord.");
      return;
    }

    setIsSubmitting(true);

    try {
      const user = isRegister
        ? await register({ username: username.trim(), email, password })
        : await login({ email, password });

      onSuccess(user);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Något gick fel. Försök igen."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
      {isRegister && (
        <AuthField
          id="username"
          label="Användarnamn"
          type="text"
          value={username}
          autoComplete="username"
          disabled={isSubmitting}
          onChange={setUsername}
        />
      )}

      <AuthField
        id="email"
        label="E-post"
        type="email"
        value={email}
        autoComplete="email"
        disabled={isSubmitting}
        onChange={setEmail}
      />

      <AuthField
        id="password"
        label="Lösenord"
        type="password"
        value={password}
        autoComplete={isRegister ? "new-password" : "current-password"}
        disabled={isSubmitting}
        hint={isRegister ? "Minst 8 tecken." : undefined}
        onChange={setPassword}
      />

      <p role="alert" aria-live="polite" className="min-h-5 text-sm text-red-400">
        {error}
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="bg-amber-200 px-4 py-3 font-semibold text-neutral-950 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? isRegister
            ? "Skapar konto…"
            : "Loggar in…"
          : isRegister
            ? "Skapa konto"
            : "Logga in"}
      </button>
    </form>
  );
}

export default LoginForm;
