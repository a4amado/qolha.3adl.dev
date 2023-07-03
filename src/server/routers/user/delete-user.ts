import prisma from "@db";
import { Schema$Client$DeleteUser } from "@schema/user/delete-user";
import { publicProcedure } from "src/server/trpc";

const deleteUser = publicProcedure.input(Schema$Client$DeleteUser).mutation(async (opts) => {
    const deletedAccount = await prisma.user.delete({
        where: {
            id: opts.input.userId,
        },
    });
    return deletedAccount;
});

export default deleteUser;
