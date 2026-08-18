import type { AuthUser } from '../api/auth'
import LoginForm from '../components/loginForm'

type LoginProps = {
 onLogin: (user: AuthUser) => void
}

function Login({ onLogin }: LoginProps) {
 return (
  <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6">
   <section className="w-full max-w-md">
    <h1 className="mb-2 text-3xl font-bold text-white">Tarkov Market</h1>

    <p className="mb-6 text-sm text-neutral-500">
     Logga in för att komma åt din dashboard.
    </p>

    <LoginForm onSuccess={onLogin} />
   </section>
  </main>
 )
}

export default Login
