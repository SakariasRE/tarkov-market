import { useState } from 'react'

function LoginForm() {
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [error, setError] = useState('')

 function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  setError('')

  if (!email.trim()) {
   setError('Please enter your email.')
   return
  }

  if (!password) {
   setError('Please enter your password.')
   return
  }

  console.log('Login form submitted')
 }

 return (
  <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-5">
   <div className="flex flex-col gap-2">
    <label htmlFor="email" className="text-sm text-neutral-200">
     Email
    </label>

    <input
     id="email"
     name="email"
     type="email"
     value={email}
     onChange={(event) => setEmail(event.target.value)}
     autoComplete="email"
     required
     className="border border-neutral-700 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-amber-200"
    />
   </div>

   <div className="flex flex-col gap-2">
    <label htmlFor="password" className="text-sm text-neutral-200">
     Password
    </label>

    <input
     id="password"
     name="password"
     type="password"
     value={password}
     onChange={(event) => setPassword(event.target.value)}
     autoComplete="current-password"
     required
     className="border border-neutral-700 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-amber-200"
    />
   </div>

   {error && (
    <p role="alert" className="text-sm text-red-400">
     {error}
    </p>
   )}

   <button
    type="submit"
    className="bg-amber-200 px-4 py-3 font-semibold text-neutral-950 hover:bg-amber-300"
   >
    Log in
   </button>
  </form>
 )
}

export default LoginForm
