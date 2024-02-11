import { createTRPCRouter, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  session: protectedProcedure.query(async (ctx) => {
    return ctx.ctx.session;
  }),
});
