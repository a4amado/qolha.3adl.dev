import prisma from "@db";
import { Schema$Client$UserQuery } from "@schema/user/query-user";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "src/server/trpc";

const QueryUser = publicProcedure.input(Schema$Client$UserQuery).mutation(async (opts) => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    id: opts.input._userId,
                },
                {
                    email: opts.input._email,
                },
            ],
        },
    });
    return user;
});

export default QueryUser;
