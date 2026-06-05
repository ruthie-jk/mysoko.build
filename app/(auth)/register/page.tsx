'use client'

import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Mail, Lock, User, Building2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    businessName: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      await register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.businessName
      )
      // Redirect to onboarding after registration
      router.push('/onboarding')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.')
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
            <p className="text-muted-foreground">Start your journey to better credit access</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Business Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Your Business"
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition touch-feedback"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
