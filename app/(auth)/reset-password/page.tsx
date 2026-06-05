'use client'

import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Mail, Lock, ArrowRight } from 'lucide-react'

type ResetStep = 'email' | 'token' | 'password' | 'success'

export default function ResetPasswordPage() {
  const router = useRouter()
  const { resetPassword } = useAuth()
  const [step, setStep] = useState<ResetStep>('email')
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // In a real app, this would send a reset email
      // For demo, we'll just proceed to token step
      await new Promise(resolve => setTimeout(resolve, 800))
      setStep('token')
    } catch (err) {
      setError('Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleTokenSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // In a real app, verify the token
      await new Promise(resolve => setTimeout(resolve, 600))
      if (token.length < 4) {
        setError('Invalid reset token')
        return
      }
      setStep('password')
    } catch (err) {
      setError('Invalid token. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      await resetPassword(email, token, password)
      setStep('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted">
      {/* Back Link */}
      <div className="px-4 py-4">
        <Link href="/login" className="text-primary text-sm font-medium hover:underline">
          ← Back to Login
        </Link>
      </div>

      {/* Form Container */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
              <span className="text-2xl font-bold text-primary-foreground">M</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Reset Password</h1>
            <p className="text-muted-foreground">
              {step === 'email' && 'Enter your email to receive a reset link'}
              {step === 'token' && 'Enter the reset token from your email'}
              {step === 'password' && 'Create a new password for your account'}
              {step === 'success' && 'Your password has been reset'}
            </p>
          </div>

          {/* Progress Indicator */}
          {step !== 'success' && (
            <div className="flex gap-2 mb-8">
              <div
                className={`flex-1 h-1 rounded-full ${
                  ['email', 'token', 'password'].includes(step)
                    ? 'bg-primary'
                    : 'bg-muted'
                }`}
              />
              <div
                className={`flex-1 h-1 rounded-full ${
                  ['token', 'password'].includes(step) ? 'bg-primary' : 'bg-muted'
                }`}
              />
              <div
                className={`flex-1 h-1 rounded-full ${
                  step === 'password' ? 'bg-primary' : 'bg-muted'
                }`}
              />
            </div>
          )}

          {/* Email Step */}
          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition touch-feedback flex items-center justify-center gap-2"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          {/* Token Step */}
          {step === 'token' && (
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg mb-4">
                <p className="text-sm text-muted-foreground">
                  For demo purposes, use any 4+ character token (e.g., <code className="bg-muted px-1 rounded">1234</code>)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Reset Token
                </label>
                <input
                  type="text"
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  placeholder="Enter token from email"
                  className="w-full px-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition touch-feedback flex items-center justify-center gap-2"
              >
                {loading ? 'Verifying...' : 'Verify Token'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          {/* Password Step */}
          {step === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  New Password
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

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition touch-feedback"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}

          {/* Success Step */}
          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">Password Reset Successful</h2>
                <p className="text-muted-foreground">
                  Your password has been updated. You can now log in with your new password.
                </p>
              </div>

              <Link
                href="/login"
                className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 smooth-transition touch-feedback inline-block text-center"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
