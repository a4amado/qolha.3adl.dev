import prisma from "@db";
import { Schema$Client$UserQuery } from "@schema/user/query-user";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "src/server/trpc";
import { string } from "yup";

const QueryUserById = publicProcedure.input(string().uuid().required()).query(async (opts) => {
    const user = await prisma.user.findFirst({
        where: {
            id: opts.input,
        },
    });
    return user;
});

const QueryUserByEmail = publicProcedure.input(string().email().required()).query(async (opts) => {
    const user = await prisma.user.findFirst({
        where: {
            email: opts.input,
        },
    });
    return user;
});

export default {
    QueryUserById,
    QueryUserByEmail,
};
