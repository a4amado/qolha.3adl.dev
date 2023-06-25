import { Schema$API$QueryWord } from "@schema/word/query-word";
import { router, publicProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import aPromiseWrapper from "a-promise-wrapper";
import prisma from "@db";
import { TRPCError } from "@trpc/server";
import { string } from "yup";
import userRouter from "./user";

const appRouter = router({
    word: router({
        query: publicProcedure.input(Schema$API$QueryWord).query(async ({ input, ctx }) => {
            const searchObject: Prisma.WordFindManyArgs = {
                take: input.query._limit,
                skip: (input.query._page || 0) * 10,
            };
            if (input.query._sort) {
                searchObject.orderBy = {
                    [input.query._sort]: {
                        _count: input.query._order,
                    },
                };
            }
            if (input.query._userID) {
                searchObject.where = {
                    ...searchObject.where,
                    userId: input.query._userID,
                };
            }
            if (input.query._email) {
                searchObject.where = {
                    ...searchObject.where,
                    user: {
                        email: input.query._email,
                    },
                };
            }
            const word = await aPromiseWrapper(prisma.word.findMany(searchObject));
            if (word.error) {
                return new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                });
            }
            return word.data.length > 1 ? word.data : word.data[0];
        }),
        getWordById: publicProcedure.input(string().required().uuid()).query(async ({ input }) => {
            const word = await prisma.word.findUnique({
                where: {
                    id: input,
                },
                select: {
                    clips: {
                        take: 10,
                        select: {
                            user: {
                                select: {
                                    id: true,
                                    image: true,
                                    name: true,
                                },
                            },
                            clipName: true,
                            id: true,
                        },
                    },
                    user: {
                        select: {
                            id: true,
                            image: true,
                            name: true,
                        },
                    },
                    ar: true,
                    description: true,
                },
            });
            return word;
        }),
    }),

    user: userRouter
});

export { appRouter };

type AppRouter = typeof appRouter;
export type { AppRouter };
