import { createTRPCRouter } from "~/server/api/trpc";
import { wordRouter } from "./routers/word";
import clipRouter from "./routers/clip";
import { authRouter } from "./routers/auth";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  word: wordRouter,
  clip: clipRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
