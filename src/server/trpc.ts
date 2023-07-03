import { initTRPC } from "@trpc/server";

import type {Context} from "../pages/api/trpc/[trpc]"

const t = initTRPC.context<Context>().create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const middleware = t.middleware;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async (opts) => {
    
});
