import prisma from "@db";
import { Prisma } from "@prisma/client";
import { Schema$Client$QueryWord } from "@schema/word/query-word";
import { publicProcedure } from "src/server/trpc";

const queryWord = publicProcedure.input(Schema$Client$QueryWord).query(async (opts) => {
    const searchObject: Prisma.WordFindManyArgs = {
        take: opts.input._limit,
        skip: (opts.input._page || 0) * 10,
    };
    if (opts.input._sort) {
        searchObject.orderBy = {
            [opts.input._sort]: {
                _count: opts.input._order,
            },
        };
    }
    if (opts.input._userID) {
        searchObject.where = {
            ...searchObject.where,
            userId: opts.input._userID,
        };
    }
    if (opts.input._email) {
        searchObject.where = {
            ...searchObject.where,
            user: {
                email: opts.input._email,
            },
        };
    }
    const word = await prisma.word.findMany({
        ...searchObject,
        select: {
            clips: {
                take: 5,
            },
            user: {
                select: {
                    name: true,
                    id: true,
                },
            },
            id: true,
            ar: true,
        },
    });

    return word;
});

export default queryWord;
