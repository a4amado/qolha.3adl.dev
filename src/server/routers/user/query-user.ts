import prisma from "@db";
import { Schema$API$UserQuery } from "@schema/user/query-user";
import { TRPCError } from "@trpc/server";
import aPromiseWrapper from "a-promise-wrapper";
import { publicProcedure } from "src/server/trpc";

const QueryUser = publicProcedure.input(Schema$API$UserQuery).query(async (opts) => {
    const findUniqueWhere: { email?: string; id?: string } = {};
    if (opts.input.query._email) {
        findUniqueWhere.email = opts.input.query._email;
    } else {
        findUniqueWhere.id = opts.input.query._userId;
    }

    const user = await prisma.user.findFirst({
        where: findUniqueWhere,
    });
    // if (user.error) return new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    return user;
});

export default QueryUser;
