import { z } from "zod";
import { createTRPCRouter, moderatorProcedure } from "../trpc";
import { db } from "~/server/db";

const clipRouter = createTRPCRouter({
  approveClip: moderatorProcedure
    .input(
      z.object({
        clipId: z.string().cuid(),
      }),
    )
    .mutation(async (ctx) => {
      const approvedClip = await db.clip.update({
        data: {
          approved: new Date().toISOString(),
        },
        where: {
          id: ctx.input.clipId,
        },
      });
      return approvedClip;
    }),
  rejectClip: moderatorProcedure
    .input(
      z.object({
        clipId: z.string().cuid(),
      }),
    )
    .mutation(async (ctx) => {
      const rejectedClip = await db.clip.delete({
        where: {
          id: ctx.input.clipId,
        },
      });
      return rejectedClip;
    }),
});

export default clipRouter;
