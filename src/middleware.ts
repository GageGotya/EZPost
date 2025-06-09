import { authMiddleware } from "@clerk/nextjs/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhooks(.*)",
    "/about",
    "/pricing",
    "/features",
    "/privacy",
    "/terms",
    "/docs",
  ],
  ignoredRoutes: [
    "/api/webhooks(.*)",
    "/_next/static/(.*)",
    "/favicon.ico",
  ],
  afterAuth(auth, req, evt) {
    // Handle auth state
    console.log('Auth state:', auth.userId ? 'Authenticated' : 'Unauthenticated');
  },
  debug: process.env.NODE_ENV === 'development',
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 