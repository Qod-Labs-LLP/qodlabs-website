import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'
import type { Metadata } from 'next'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Qod Labs LLP - Modern Web Engineering & Intelligent AI Systems',
  description: 'Empowering ambitious businesses with high-performance websites, custom agentic AI workflows, and scalable digital solutions.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Qod Labs LLP - Modern Web Engineering & Intelligent AI Systems',
    description: 'Empowering ambitious businesses with high-performance websites, custom agentic AI workflows, and scalable digital solutions.',
    images: ['/og-image.png'],
    type: 'website',
  },
  metadataBase: new URL('https://qodlabs.in'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const chatConfig = JSON.stringify({
    title: 'Qod Labs Assist',
    brandName: 'Qod Labs',
    assistantName: 'Qod Labs Assistant',
    supportName: 'Sanjay · Qod Labs Support',
    presence: 'AI assistant · Sanjay available',
    greeting: 'Hello — welcome to Qod Labs! Tell us what you are building or trying to solve.',
    accent: '#2563eb',
    accent2: '#0d9488',
    turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
  }).replace(/</g, '\\u003c')

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/chat-widget.css" />
        <script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          data-wtc-turnstile="true"
          async
          defer
        ></script>
      </head>
      <body className={`${dmSans.variable} ${jakartaSans.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <ChunkLoadErrorHandler />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.WebsiteTelegramChatConfig=${chatConfig};`,
            }}
          />
          <script src="/chat-widget.js" defer></script>
        </ThemeProvider>
      </body>
    </html>
  )
}
