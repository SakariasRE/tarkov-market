import { useState } from 'react'
import type { AuthUser } from '../api/auth'
import { login, register } from '../api/auth'

type LoginFormProps = {
 onSuccess: (user: AuthUser) => void
}

const INPUT_CLASS =
 'border border-neutral-700 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-amber-200 focus-visible:ring-2 focus-visible:ring-amber-300 disabled:opacity-60'

function LoginForm({ onSuccess }: LoginFormProps) {
 const [mode, setMode] = useState<'login' | 'register'>('login')
 const [username, setUsername] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [error, setError] = useState('')
 const [isSubmitting, setIsSubmitting] = useState(false)

 const isRegister = mode === 'register'

 function switchMode() {
  setMode(isRegister ? 'login' : 'register')
  setError('')
 }

 async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  setError('')

  if (isRegister && !username.trim()) {
   setError('Ange ett användarnamn.')
   return
  }

  if (!email.trim()) {
   setError('Ange din e-postadress.')
   return
  }

  if (!password) {
   setError('Ange ditt lösenord.')
   return
  }

  setIsSubmitting(true)

  try {
   const user = isRegister
    ? await register({ username: username.trim(), email, password })
    : await login({ email, password })

   onSuccess(user)
  } catch (submitError) {
   setError(
    submitError instanceof Error
     ? submitError.message
     : 'Något gick fel. Försök igen.'
   )
  } finally {
   setIsSubmitting(false)
  }
 }

 return (
  <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-5">
   {isRegister && (
    <div className="flex flex-col gap-2">
     <label htmlFor="username" className="text-sm text-neutral-200">
      Användarnamn
     </label>

     <input
      id="username"
      name="username"
      type="text"
      value={username}
      onChange={(event) => setUsername(event.target.value)}
      autoComplete="username"
      disabled={isSubmitting}
      required
      className={INPUT_CLASS}
     />
    </div>
   )}

   <div className="flex flex-col gap-2">
    <label htmlFor="email" className="text-sm text-neutral-200">
     E-post
    </label>

    <input
     id="email"
     name="email"
     type="email"
     value={email}
     onChange={(event) => setEmail(event.target.value)}
     autoComplete="email"
     disabled={isSubmitting}
     required
     className={INPUT_CLASS}
    />
   </div>

   <div className="flex flex-col gap-2">
    <label htmlFor="password" className="text-sm text-neutral-200">
     Lösenord
    </label>

    <input
     id="password"
     name="password"
     type="password"
     value={password}
     onChange={(event) => setPassword(event.target.value)}
     autoComplete={isRegister ? 'new-password' : 'current-password'}
     disabled={isSubmitting}
     required
     className={INPUT_CLASS}
    />

    {isRegister && (
     <p className="text-xs text-neutral-500">Minst 8 tecken.</p>
    )}
   </div>

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
       ? 'Skapar konto…'
       : 'Loggar in…'
     : isRegister
       ? 'Skapa konto'
       : 'Logga in'}
   </button>

   <button
    type="button"
    onClick={switchMode}
    disabled={isSubmitting}
    className="text-sm text-neutral-400 underline transition hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
   >
    {isRegister
     ? 'Har du redan ett konto? Logga in'
     : 'Inget konto? Skapa ett här'}
   </button>
  </form>
 )
}

export default LoginForm
