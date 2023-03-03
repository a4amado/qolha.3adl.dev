import { PrismaClient } from "@prisma/client";

declare global {
    let prisma: PrismaClient | undefined;
}

// @ts-ignore
const client = globalThis.prisma || new PrismaClient({
    log: ["error", "info", "query", "warn"],
    errorFormat: "minimal"
});
// @ts-ignore
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client as PrismaClient;

