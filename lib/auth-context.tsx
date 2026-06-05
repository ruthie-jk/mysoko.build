'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  businessName: string
  industry: string
  createdAt: string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    businessName: string
  ) => Promise<void>
  logout: () => void
  updateProfile: (
    firstName: string,
    lastName: string,
    businessName: string,
    industry: string
  ) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
  resetPassword: (email: string, token: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize from sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem('mysoko_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('[v0] Failed to parse stored user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      const data = await response.json()
      sessionStorage.setItem('mysoko_user', JSON.stringify(data.user))
      setUser(data.user)
    } finally {
      setLoading(false)
    }
  }

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    businessName: string
  ) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName, businessName }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }

      const data = await response.json()
      sessionStorage.setItem('mysoko_user', JSON.stringify(data.user))
      setUser(data.user)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    sessionStorage.removeItem('mysoko_user')
    sessionStorage.removeItem('mysoko_preferences')
    setUser(null)
  }

  const updateProfile = async (
    firstName: string,
    lastName: string,
    businessName: string,
    industry: string
  ) => {
    if (!user) throw new Error('Not authenticated')
    setLoading(true)
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, businessName, industry, userId: user.id }),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const updatedUser = { ...user, firstName, lastName, businessName, industry }
      sessionStorage.setItem('mysoko_user', JSON.stringify(updatedUser))
      setUser(updatedUser)
    } finally {
      setLoading(false)
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) throw new Error('Not authenticated')
    setLoading(true)
    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, currentPassword, newPassword }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to change password')
      }
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string, token: string, newPassword: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, newPassword }),
      })

      if (!response.ok) {
        throw new Error('Failed to reset password')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
