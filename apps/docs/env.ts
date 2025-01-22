import { vercel } from '@t3-oss/env-core/presets';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  extends: [vercel()],
  server: {
    ANALYZE: z.string().optional(),
    BETTERSTACK_API_KEY: z.string().min(1).optional(),
    BETTERSTACK_URL: z.string().min(1).url().optional(),

    // Added by Vercel
    NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),

    // Added by Sentry Integration, Vercel Marketplace
    SENTRY_ORG: z.string().min(1).optional(),
    SENTRY_PROJECT: z.string().min(1).optional(),

    // Sneaky peeky
    V0_EDIT_SECRET: z.string().min(1),
    DEPLOYMENT_PROTECTION_BYPASS: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z
      .string()
      .min(1)
      .startsWith('G-')
      .optional(),
    NEXT_PUBLIC_LOGO_DEV_TOKEN: z.string().min(1).optional(),

    // Added by Sentry Integration, Vercel Marketplace
    NEXT_PUBLIC_SENTRY_DSN: z.string().min(1).url().optional(),
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    BETTERSTACK_API_KEY: process.env.BETTERSTACK_API_KEY,
    BETTERSTACK_URL: process.env.BETTERSTACK_URL,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_LOGO_DEV_TOKEN: process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN,
    V0_EDIT_SECRET: process.env.V0_EDIT_SECRET,
    DEPLOYMENT_PROTECTION_BYPASS: process.env.DEPLOYMENT_PROTECTION_BYPASS,
  },
});
