import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/_app";

import { getServerSession } from "next-auth/next";

import { inferAsyncReturnType } from "@trpc/server";
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import prisma from "@db";

async function createContext({ req, res }: trpcNext.CreateNextContextOptions) {
    const b = await getServerSession(req, res, authOptions);
    const user = await prisma.user.findUnique({
        where: {
            email: b?.user?.email || "",
        },
    });
    if (!b?.user) {
        return {};
    }

    return { user: { ...b.user, role: user?.role } };
}

export type Context = inferAsyncReturnType<typeof createContext>;

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: createContext,
});
