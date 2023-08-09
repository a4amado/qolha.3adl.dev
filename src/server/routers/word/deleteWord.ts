import prisma from "@db";
import { Schema$Client$DeleteWord } from "@schema/word/delete-word";
import { adminProcedure } from "src/server/trpc";

const deleteWord = adminProcedure.input(Schema$Client$DeleteWord).mutation(async (opts) => {
    const deletedWord = await prisma.word.delete({
        where: {
            id: opts.input.wordId,
        },
    });

    return deletedWord;
});

export default deleteWord;
