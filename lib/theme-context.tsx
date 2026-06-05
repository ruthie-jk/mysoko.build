'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Get theme from localStorage or system preference
    const stored = localStorage.getItem('mysoko_theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (stored) {
      setTheme(stored)
    } else {
      setTheme(prefersDark ? 'dark' : 'light')
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const html = document.documentElement
    if (theme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }

    localStorage.setItem('mysoko_theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
