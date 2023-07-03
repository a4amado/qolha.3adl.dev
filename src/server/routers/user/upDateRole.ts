import prisma from "@db";
import { Schema$Client$UpdateRole } from "@schema/user/update-role";
import { publicProcedure } from "src/server/trpc";

const updateRole = publicProcedure.input(Schema$Client$UpdateRole).mutation(async (opts) => {
    const update_role = await prisma.user.update({
        data: {
            role: opts.input.role,
        },
        where: {
            id: opts.input.userId,
        },
        select: {
            role: true,
            id: true,
        },
    });
    return update_role;
});

export default updateRole;
