import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/firebase'

// Paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/dashboard/content',
  '/dashboard/schedule',
  '/dashboard/analytics',
  '/dashboard/credits',
  '/dashboard/profile',
  '/dashboard/settings',
]

// Paths that should redirect to dashboard if user is authenticated
const authPaths = ['/login', '/signup']

export async function middleware(request: NextRequest) {
  const user = auth.currentUser
  const path = request.nextUrl.pathname

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some(
    (protectedPath) => path.startsWith(protectedPath)
  )

  // Check if the path is an auth path (login/signup)
  const isAuthPath = authPaths.some(
    (authPath) => path === authPath
  )

  if (isProtectedPath && !user) {
    // Redirect to login if trying to access protected path without authentication
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthPath && user) {
    // Redirect to dashboard if trying to access auth paths while authenticated
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  const response = NextResponse.next()

  // Security Headers
  const securityHeaders = {
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    // CSP Header - adjust based on your needs
    'Content-Security-Policy': `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-insights.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https:;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      block-all-mixed-content;
      upgrade-insecure-requests;
    `.replace(/\s+/g, ' ').trim()
  }

  // Add security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Cache control for static assets
  if (request.nextUrl.pathname.startsWith('/_next/static')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Cache control for images
  if (request.nextUrl.pathname.startsWith('/images/')) {
    response.headers.set('Cache-Control', 'public, max-age=86400')
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 