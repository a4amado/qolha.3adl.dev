import { AuthPrisma } from "@db";
import NextAuth, { AuthOptions } from "next-auth";


import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";



export const authOptions: AuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            // @ts-ignore
            token.role = user?.role || "user"
            return token;

        },
        async session({ session, token, user }) {
            // @ts-ignore
            session.user.role = token.role;
            return session;
        },
    },
    adapter: AuthPrisma,

    session: {
        strategy: "jwt",
    },

    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
    theme: {
        colorScheme: "auto"

    }
};

export default NextAuth(authOptions);
