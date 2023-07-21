import prisma from "@db";
import { Schema$Client$UserQuery } from "@schema/user/query-user";
import { TRPCError } from "@trpc/server";
 import { publicProcedure } from "src/server/trpc";

const QueryUser = publicProcedure.input(Schema$Client$UserQuery).query(async (opts) => {
    const findUniqueWhere: { email?: string; id?: string } = {};
    if (opts.input._email) {
        findUniqueWhere.email = opts.input._email;
    } else {
        findUniqueWhere.id = opts.input._userId;
    }

    const user = await prisma.user.findFirst({
        where: findUniqueWhere,
    });
    // if (user.error) return new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    return user;
});

export default QueryUser;
