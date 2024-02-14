import { z } from "zod";
import { createTRPCRouter, authenticatedProcedure, superUserProcedure } from "../trpc";
import { db } from "~/server/db";
import { api } from "~/trpc/server";
import { client } from "~/server/supabase";

const clipRouter = createTRPCRouter({
  approveClip: superUserProcedure
    .input(
      z.object({
        clipId: z.string().uuid(),
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
  rejectClip: superUserProcedure
    .input(
      z.object({
        clipId: z.string().uuid(),
      }),
    )
    .mutation(async (ctx) => {
      const rejectedClip = await db.clip.delete({
        where: {
          id: ctx.input.clipId,
        },
        select: {
          word: {
            select: {
              id: true,
              number_of_clips: true,
            },
          },
          supabase_path: true,
        },
      });

      if (!rejectedClip.word) return;
      if (rejectedClip.word.number_of_clips === 0) return;

      await client.storage.from("clip").remove([rejectedClip.supabase_path]);
      await db.word.update({
        where: {
          id: rejectedClip.word.id,
        },
        data: {
          number_of_clips: {
            decrement: 1,
          },
        },
      });
      return rejectedClip;
    }),
  get15WordThatNeedsRevision: superUserProcedure.query(async () => {
    return await db.clip.findMany({
      where: {
        approved: null,
      },
      orderBy: {
        word: {
          number_of_clips: "asc",
        },
      },
      take: 15,
      include: {
        word: {
          select: {
            text: true,
            id: true,
          },
        },
      },
    });
  }),
});

export default clipRouter;
