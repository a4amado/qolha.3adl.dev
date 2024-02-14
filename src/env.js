import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().refine((str) => !str.includes("YOUR_MYSQL_URL_HERE"), "You forgot to change the default URL"),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    SUPABASE_BASEURL: z.string(),
    SUPABASE_SECRET_SERVICE_ROLE: z.string(),
  },


  client: {
    NEXT_PUBLIC_SUPABASE_BASEURL: z.string(),
    NEXT_PUBLIC_SUPABASE_SECRET_ANON: z.string(),
  },


  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    SUPABASE_BASEURL: process.env.NEXT_PUBLIC_SUPABASE_SECRET_ANON,
    SUPABASE_SECRET_SERVICE_ROLE: process.env.SUPABASE_SECRET_SERVICE_ROLE,
    NEXT_PUBLIC_SUPABASE_BASEURL: process.env.NEXT_PUBLIC_SUPABASE_BASEURL,
    NEXT_PUBLIC_SUPABASE_SECRET_ANON: process.env.NEXT_PUBLIC_SUPABASE_SECRET_ANON,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
