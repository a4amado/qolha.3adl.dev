import prisma from "@db";
import { Schema$Client$InsertWord } from "@schema/word/insert-word";
import { randomUUID } from "node:crypto";
import { publicProcedure } from "src/server/trpc";

const insertWord = publicProcedure.input(Schema$Client$InsertWord).mutation(async (opts) => {
    const word = await prisma.word.create({
        data: {
            ar: opts.input.word,
            // @ts-ignore
            userId: req?.session?.id,
            id: randomUUID(),
            accepted: false,
            description: opts.input.description || "",
        },
    });

    return word;
});

export default insertWord;
