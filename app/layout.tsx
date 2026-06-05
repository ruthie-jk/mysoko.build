import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fredoka, Geist_Mono } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({ variable: '--font-fredoka', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'MySoko - Democratizing Credit for MSMEs',
  description:
    'MySoko provides fast, accessible credit solutions for micro, small, and medium enterprises. Apply for loans without collateral. Instant approval process. Secure, transparent, and fair lending platform for businesses.',
  keywords: [
    'MSME credit',
    'microfinance',
    'business loans',
    'SME financing',
    'small business credit',
  ],
  authors: [{ name: 'MySoko' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mysoko.vercel.app',
    siteName: 'MySoko',
    title: 'MySoko - Democratizing Credit for MSMEs',
    description:
      'Fast, accessible credit solutions for micro, small, and medium enterprises',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MySoko',
  },
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${geistMono.variable} scroll-smooth`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MySoko" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('[v0] SW registered'))
                    .catch(err => console.log('[v0] SW registration failed:', err))
                })
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
