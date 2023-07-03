import prisma from "@db";
import { Schema$Client$BanUser } from "@schema/user/ban-user";
import { adminProcedure, publicProcedure } from "src/server/trpc";

const UnbanUser = adminProcedure.input(Schema$Client$BanUser).mutation(async (opts) => {
    const bannedUser = await prisma.user.update({
        where: {
            id: opts.input.userId,
        },
        data: {
            banned: new Date(),
        },
    });

    await prisma.session.deleteMany({
        where: {
            userId: opts.input.userId,
        },
    });
    return bannedUser;
});

export default UnbanUser;
