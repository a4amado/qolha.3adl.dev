import prisma, { AuthPrisma } from "@db";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import requestIp from "request-ip"

export const authOptions = (req: NextApiRequest, res: NextApiResponse): AuthOptions => {
    const ip = requestIp.getClientIp(req)

    return ({
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }),
        ],
        callbacks: {
            async jwt({ token, user, account, profile }) {
                if (user) {
                    return {
                        ...token,
                        // @ts-ignore
                        role: user?.role,
                    };
                }
                return token;
            },
            async session({ session, token, user }) {
                // @ts-ignore
                session.user.role = token?.role || user?.role;
                return session;
            },
            signIn(params) {
                // @ts-ignore
                if (params.user.banned) return "You-are-banned";

                return true;
            },
        },
        adapter: AuthPrisma,

        session: {
            strategy: "database",
            maxAge: 1000 * 60 * 60,
        },

        debug: true,
        secret: process.env.NEXTAUTH_SECRET,
        theme: {
            colorScheme: "auto",
        },
        events: {
            async createUser(message) {
                await prisma.user.update({
                    data: {
                        country: ip || ""
                    },
                    where: {
                        email: message.user.email || ""
                    }
                })
            },
        }
    })
}
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  
    return await NextAuth(req, res, authOptions(req, res));
}
