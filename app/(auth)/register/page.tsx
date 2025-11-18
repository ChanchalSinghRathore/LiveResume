'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Registration failed')
        return
      }

      // Redirect to login
      router.push('/login?registered=true')
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
          <h1 className="text-3xl font-bold text-primary-darkest dark:text-primary-lightest">Create your account</h1>
          <p className="text-primary-mediumDark dark:text-primary-light mt-2">Start building your dynamic resume</p>
        </div>

        <div className="bg-white dark:bg-primary-dark rounded-xl shadow-lg dark:shadow-primary-darkest/50 border border-primary-lightest dark:border-primary-mediumDark p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light focus:border-transparent bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light focus:border-transparent bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') })}
                required
                minLength={3}
                maxLength={30}
                className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light focus:border-transparent bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                placeholder="johndoe"
              />
              <p className="mt-1 text-xs text-primary-mediumDark dark:text-primary-light">Only lowercase letters, numbers, hyphens, and underscores</p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={8}
                className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light focus:border-transparent bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-primary-mediumDark dark:text-primary-light">At least 8 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-medium dark:bg-primary-mediumDark text-white dark:text-primary-lightest py-3 rounded-lg font-semibold hover:bg-primary-mediumDark dark:hover:bg-primary-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-primary-mediumDark dark:text-primary-light">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-medium dark:text-primary-light hover:text-primary-mediumDark dark:hover:text-primary-light font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}



