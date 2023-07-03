import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/_app";
 
import { getServerSession } from "next-auth/next";

import { TRPCError, inferAsyncReturnType } from '@trpc/server';
 import { authOptions } from "src/pages/api/auth/[...nextauth]";


 async function createContext({
    req,
    res,
}: trpcNext.CreateNextContextOptions) {

    const b = await getServerSession(req, res, authOptions);

    if (b?.user) return b?.user;

    return new TRPCError({
        code: "UNAUTHORIZED"
    })
}

export type Context = inferAsyncReturnType<typeof createContext>;



export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: createContext

});
