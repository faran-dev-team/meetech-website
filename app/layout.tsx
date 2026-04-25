import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import SessionProvider from "@/components/providers/SessionProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  subsets: ["latin"],
  // Only load the weights we actually use — fewer font files = faster FOUT
  weight: ["400", "600", "700", "900"],
  variable: "--font-work-sans",
  display: "swap",
  preload: true,
  // Fallback stack keeps layout stable before the webfont arrives
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: true,
});

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://meetech.dev'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Meetech Development — High-Performance Digital Products',
    template: '%s | Meetech Development',
  },
  description:
    'Meetech Development architects high-performance digital ecosystems and production-grade products — web apps, mobile apps, SaaS, MVPs, and AI tools — for enterprises requiring absolute reliability and global scale.',
  keywords: [
    'software development company',
    'web development',
    'mobile app development',
    'MVP development',
    'custom software',
    'SaaS development',
    'AI tools',
    'blockchain development',
    'Next.js agency',
    'React development',
  ],
  authors: [{ name: 'Meetech Development', url: BASE_URL }],
  creator: 'Meetech Development',
  publisher: 'Meetech Development',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Meetech Development',
    title: 'Meetech Development — High-Performance Digital Products',
    description:
      'We architect high-performance digital ecosystems for enterprises requiring absolute reliability and global scale.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Meetech Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meetech Development — High-Performance Digital Products',
    description:
      'We architect high-performance digital ecosystems for enterprises requiring absolute reliability and global scale.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/iconlight.png',
    shortcut: '/iconlight.png',
    apple: '/iconlight.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to font origins so the first request lands instantly */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* dns-prefetch for media CDNs used later in the page */}
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        className={`${workSans.variable} min-h-screen antialiased work-sans`}
      >
        {/* Inline theme script runs before paint — prevents flash of wrong theme */}
        <Script
          src="/theme-init.js"
          strategy="beforeInteractive"
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-text-inverse focus:outline-none"
        >
          Skip to main content
        </a>
        <SessionProvider>
          <ToastProvider>
            <div className="flex min-h-screen flex-col overflow-x-hidden work-sans">
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </div>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
