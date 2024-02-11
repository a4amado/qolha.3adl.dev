import { z } from "zod";
import {
  createTRPCRouter,
  moderatorProcedure,
  protectedProcedure,
} from "../trpc";
import { db } from "~/server/db";
import { api } from "~/trpc/server";
import { Roles } from "@prisma/client";

export const wordRouter = createTRPCRouter({
  createWord: protectedProcedure
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
          lang: "ar",
          user_id: ctx.ctx.session.user.id,
          number_of_clips: 0,
          approved: ["SUPREME_LEADER", "MODRATOR"].includes(
            ctx.ctx.session.user.role,
          )
            ? new Date()
            : null,
        },
      });

      return word;
    }),

  approveWords: moderatorProcedure
    .input(
      z.object({
        wordID: z.string().cuid(),
      }),
    )
    .mutation(async (ctx) => {
      const word = await db.word.update({
        data: {
          approved: new Date().toISOString(),
        },
        where: {
          id: ctx.input.wordID,
        },
      });
      return word;
    }),
  rejectWords: moderatorProcedure
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
  getaWordThatNeedClips: protectedProcedure.query(async () => {
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
