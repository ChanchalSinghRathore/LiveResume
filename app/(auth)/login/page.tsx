'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lightest dark:from-primary-darkest to-white dark:to-primary-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center mb-4 hover:opacity-80 transition-opacity">
            <FileText className="h-10 w-10 text-primary-medium dark:text-primary-light" />
            <span className="ml-2 text-2xl font-bold text-primary-darkest dark:text-primary-lightest">Live Resume</span>
          </Link>
          <h1 className="text-3xl font-bold text-primary-darkest dark:text-primary-lightest">Welcome back</h1>
          <p className="text-primary-mediumDark dark:text-primary-light mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white dark:bg-primary-dark rounded-xl shadow-lg dark:shadow-primary-darkest/50 border border-primary-lightest dark:border-primary-mediumDark p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light focus:border-transparent bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light focus:border-transparent bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-medium dark:bg-primary-mediumDark text-white dark:text-primary-lightest py-3 rounded-lg font-semibold hover:bg-primary-mediumDark dark:hover:bg-primary-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-primary-mediumDark dark:text-primary-light">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary-medium dark:text-primary-light hover:text-primary-mediumDark dark:hover:text-primary-light font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}



