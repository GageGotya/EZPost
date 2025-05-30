import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EZPost - AI-Powered Social Media Management',
  description: 'Automate your social media presence across multiple platforms with AI-powered content creation and scheduling.',
  metadataBase: new URL('https://ezpost.net'),
  openGraph: {
    title: 'EZPost - AI-Powered Social Media Management',
    description: 'Automate your social media presence across multiple platforms with AI-powered content creation and scheduling.',
    url: 'https://ezpost.net',
    siteName: 'EZPost',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EZPost - AI-Powered Social Media Management',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EZPost - AI-Powered Social Media Management',
    description: 'Automate your social media presence across multiple platforms with AI-powered content creation and scheduling.',
    images: ['/images/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
} 