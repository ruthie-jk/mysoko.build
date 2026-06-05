'use client'

import { useAuth } from '@/lib/auth-context'
import { loginAPI } from '@/lib/mock-api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      router.push('/home')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
              <span className="text-2xl font-bold text-primary-foreground">M</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to MySoko</h1>
            <p className="text-muted-foreground">Access loans tailored for your business</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/reset-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition touch-feedback"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
            <p className="text-xs font-medium text-foreground mb-2">Demo Credentials:</p>
            <p className="text-xs text-muted-foreground">
              Email: <code className="bg-muted px-1 rounded">test@example.com</code>
            </p>
            <p className="text-xs text-muted-foreground">
              Password: <code className="bg-muted px-1 rounded">password123</code>
            </p>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
