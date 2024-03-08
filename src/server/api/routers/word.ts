import { z } from "zod";
import {
  createTRPCRouter,
  superUserProcedure,
  authenticatedProcedure,
  publicProcedure,
} from "../trpc";
import { db } from "~/server/db";

export const wordRouter = createTRPCRouter({
  createWord: authenticatedProcedure
    .input(
      z.object({
        text: z
          .string()
          .min(1)
          .regex(/[\u0600-\u06FF]+/g, "ادخل كلمه عربيه")
          .transform((e, ctx) => e.trim().replaceAll(/\s+/g, " ")),
      }),
    )
    .mutation(async (ctx) => {
      const word = await db.word.create({
        data: {
          text: ctx.input.text,
          number_of_clips: 0,
          // ctx.ctx.session.user?.id
        },
      });

      return word;
    }),

  approveWords: superUserProcedure
    .input(
      z.object({
        wordID: z.string().cuid(),
      }),
    )
    .mutation(async (ctx) => {
      const word = await db.word.update({
        data: {
          // approved: new Date().toISOString(),
        },
        where: {
          id: ctx.input.wordID,
        },
      });
      return word;
    }),
  rejectWords: superUserProcedure
    .input(
      z.object({
        wordID: z.string().cuid(),
      }),
    )
    .mutation(async (ctx) => {
      const deletedWord = await db.word.delete({
        where: {
          id: ctx.input.wordID,
        },
      });
      return deletedWord;
    }),
  getaWordThatNeedClips: authenticatedProcedure.query(async () => {
    const word = await db.word.findFirst({
      orderBy: {
        number_of_clips: "asc",
      },
      where: {
        // approved: {
        //   not: null
        // }
      },
    });

    return word;
  }),
  search: publicProcedure.input(z.string()).mutation(async (ctx) => {
    const result = await db.$queryRawUnsafe(`
    SELECT W.text, W.id,   similarity(W.text, '${ctx.input}') AS word_similarity
    FROM "Word" as W
    WHERE similarity(W.text, '${ctx.input}') > ${ctx.input.length > 3 ? 0.5 : 0.3}
    ORDER BY similarity(W.text, '${ctx.input}') DESC
    LIMIT 15;
      `);
    const ids: string[] = ((result as any[]) || []).map((e) => e.id);

    let words = await db.word.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
        text: true,
        clips: {
          select: {
            id: true,
            supabase_public_url: true,
          },
        },
      },
    });

    words = words.map((v, idx) => ({
      ...v,
      // @ts-ignore
      simi: result[idx]?.word_similarity,
    }));
    return words;
  }),
});
