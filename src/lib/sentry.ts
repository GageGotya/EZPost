import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 0.1, // Sample 10% of requests for performance monitoring
    enabled: process.env.NODE_ENV === 'production',
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
  });
}

export { Sentry }; 