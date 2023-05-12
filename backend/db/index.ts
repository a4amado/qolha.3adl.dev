import { PrismaClient } from "@prisma/client";
import { env } from "process";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
const AuthPrisma = PrismaAdapter(prisma);
export default prisma;

export { AuthPrisma };
