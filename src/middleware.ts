import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/",
    "/api/webhooks/clerk",
    "/api/webhooks/stripe",
    "/pricing",
    "/about",
    "/blog",
    "/contact",
    "/sign-in",
    "/sign-up",
    "/sso-callback",
    "/api/trpc/health",
  ],
  
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [
    "/api/webhooks/clerk",
    "/api/webhooks/stripe",
    "/_next/static/*",
    "/favicon.ico",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 