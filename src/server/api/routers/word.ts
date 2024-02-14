import { z } from "zod";
import {
  createTRPCRouter,
  superUserProcedure,
  authenticatedProcedure,
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
});