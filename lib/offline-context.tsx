'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface OfflineContextType {
  isOnline: boolean
  isInitialized: boolean
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined)

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Set initial online status
    setIsOnline(navigator.onLine)
    setIsInitialized(true)

    const handleOnline = () => {
      setIsOnline(true)
      console.log('[v0] App is online')
    }

    const handleOffline = () => {
      setIsOnline(false)
      console.log('[v0] App is offline')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <OfflineContext.Provider value={{ isOnline, isInitialized }}>
      {children}
    </OfflineContext.Provider>
  )
}

export function useOffline() {
  const context = useContext(OfflineContext)
  if (context === undefined) {
    throw new Error('useOffline must be used within OfflineProvider')
  }
  return context
}
