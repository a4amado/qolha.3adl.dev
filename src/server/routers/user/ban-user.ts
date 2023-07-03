import prisma from "@db";
import { Schema$Client$BanUser } from "@schema/user/ban-user";
import { TRPCError } from "@trpc/server";
import { adminProcedure } from "src/server/trpc";




const banUser = adminProcedure.input(Schema$Client$BanUser).mutation(async (opts) => {
    const user = await prisma.user.findUnique({
        where: {
            id: opts.input.userId
        }
    });

    if (user?.role === "owner") {
        throw new TRPCError({
             code: "UNPROCESSABLE_CONTENT"
        })
    }
    

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

export default banUser;
