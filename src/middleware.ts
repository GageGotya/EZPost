import { authMiddleware } from "@clerk/nextjs/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/login",
    "/signup",
    "/api/webhooks(.*)",
    "/about",
    "/pricing",
    "/contact",
    "/blog(.*)",
  ],
  ignoredRoutes: [
    "/api/webhooks(.*)",
    "/_next/static/(.*)",
    "/favicon.ico",
  ],
  debug: process.env.NODE_ENV === 'development',
  domain: process.env.NEXT_PUBLIC_CLERK_DOMAIN || "ezpost.net",
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 