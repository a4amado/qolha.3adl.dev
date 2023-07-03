import { router } from "../trpc";
import userRouter from "./user";
import clipRouter from "./clip";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import wordRouter from "./word";
import rateRouter from "./rate";
import searchRouter from "./search";

const appRouter = router({
    word: wordRouter,
    user: userRouter,
    clip: clipRouter,
    rate: rateRouter,
    search: searchRouter,
});

export { appRouter };
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
export type AppRouter = typeof appRouter;
