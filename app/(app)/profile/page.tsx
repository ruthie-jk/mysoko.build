'use client'

import { useAuth } from '@/lib/auth-context'
import { useTheme } from '@/lib/theme-context'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { User, Lock, LogOut, Moon, Sun } from 'lucide-react'

type Tab = 'profile' | 'password' | 'settings'

export default function ProfilePage() {
  const { user, updateProfile, changePassword, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Profile form
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    businessName: user?.businessName || '',
    industry: user?.industry || '',
  })

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      await updateProfile(
        profileData.firstName,
        profileData.lastName,
        profileData.businessName,
        profileData.industry
      )
      setMessage('Profile updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword)
      setMessage('Password changed successfully!')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-8">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-1">{user?.email}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border overflow-x-auto">
          {(['profile', 'password', 'settings'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium border-b-2 smooth-transition capitalize ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'profile' && <User className="w-4 h-4 inline mr-2" />}
              {tab === 'password' && <Lock className="w-4 h-4 inline mr-2" />}
              {tab}
            </button>
          ))}
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              message.includes('success')
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={profileData.businessName}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  name="industry"
                  value={profileData.industry}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary smooth-transition"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition"
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            {/* Theme */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Theme</h3>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark mode
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-lg bg-muted hover:bg-border smooth-transition"
                >
                  {theme === 'light' ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your notification preferences
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-border accent-primary cursor-pointer"
                />
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 bg-destructive/10 border border-destructive/30 text-destructive font-medium rounded-lg hover:bg-destructive/20 smooth-transition touch-feedback"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
