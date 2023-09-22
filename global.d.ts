import Prisma from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth"


type file = {
    mimetype: String;
    mtime: String;
    newFilename: String;
    originalFilename: String;
    size: number;
};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            NODE_ENV: "development" | "production";
            MAILERSEND: string;
            DB_URL: string;
            NEXTAUTH_SECRET: string;
            DISCORD_CLIENT_ID: string;
            GOOGLE_CLIENT_ID: string;
            DISCORD_CLIENT_SECRET: string;
            GOOGLE_CLIENT_SECRET: string;
            IP_TO_LOCATION_API_KEY: string;
        }
    }
}


declare module "next-auth" {

    interface Session {
        user: {
            /** The user's postal address. */
            id: string;
            role: Prisma.Role
        } & DefaultSession["user"]
    }
}