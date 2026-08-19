import { useState } from "react";
import type { AuthUser } from "../api/auth";
import AuthCard from "../components/auth/authCard";
import AuthHeading from "../components/auth/authHeading";
import LoginForm from "../components/loginForm";
import ModeToggle from "../components/auth/modeToggle";
import DemoCredentials from "../components/auth/demoCredentials";

type LoginProps = {
  onLogin: (user: AuthUser) => void;
};

function Login({ onLogin }: LoginProps) {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <AuthCard>
      <AuthHeading
        title="Tarkov Market"
        description={
          isRegister
            ? "Skapa ett konto för att komma igång."
            : "Logga in för att komma åt din dashboard."
        }
      />

      <LoginForm isRegister={isRegister} onSuccess={onLogin} />

      <ModeToggle
        isRegister={isRegister}
        disabled={false}
        onToggle={() => setIsRegister((current) => !current)}
      />

      {!isRegister && <DemoCredentials />}
    </AuthCard>
  );
}

export default Login;
