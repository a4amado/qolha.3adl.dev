import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/_app";
import { getServerSession } from "next-auth/next";
import { inferAsyncReturnType } from "@trpc/server";
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import prisma from "@db";
import { NextApiRequest, NextApiResponse } from "next";

async function createContext({ req, res }: {
    req: NextApiRequest,
    res: NextApiResponse
}) {
    const b = await getServerSession(req, res, authOptions(req, res));

    // await prisma.user.update({
    //     data: {
    //         role: "owner"
    //     },
    //     where: {
    //         email: "a4addel@gmail.com"
    //     }
    // })
    if (!b) return {};

    const user = await prisma.user.findUnique({
        where: {
            email: b?.user?.email || "",
        },
    });

    if (!user) return {};

    return {
        user,
    };
}

export type Context = inferAsyncReturnType<typeof createContext>;

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: createContext,
});
