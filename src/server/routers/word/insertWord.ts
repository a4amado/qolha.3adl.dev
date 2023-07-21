import prisma from "@db";
import { Schema$Client$InsertWord } from "@schema/word/insert-word";
import { protectedProcedure, publicProcedure } from "src/server/trpc";

const insertWord = protectedProcedure.input(Schema$Client$InsertWord).mutation(async (opts) => {
    const word = await prisma.word.create({
        data: {
            ar: opts.input.word,
            // @ts-ignore
            userId: opts.ctx.user.id,
            accepted: false,
            description_ar: opts.input.description_ar || "",
            description_en: opts.input.description_en || "",
        },
    });

    return word;
});

export default insertWord;
