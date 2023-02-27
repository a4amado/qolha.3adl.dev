import NextAuth, { AuthOptions, Awaitable, RequestInternal, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@utils/prismadb";
import { compareSync } from "bcrypt";

export const PrismaInstance = PrismaAdapter(prisma);
export const authOptions: AuthOptions = {
  adapter: PrismaInstance,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "email", placeholder: "email@example.com", type: "text", value: "" },
        password: { label: "password", placeholder: "email@example.com", type: "password", value: "" },
      },
      authorize: async function (credentials, req): Promise<User | null> {
        try {
          console.log("HI");

          if (!credentials?.email || !credentials?.password) return null;
          const u = await prisma.user.findUnique({
            where: { email: credentials?.email },
            select: {
              id: true,
              email: true,
              role: true,
              emailVerified: true,
              image: true,
              name: true,
              accounts: {
                where: {
                  provider: "credentials",
                },
                select: {
                  hash: true,
                },
              },
            },
          });
          if (!u) return null;
          if (!u.accounts[0]?.hash) return null;
          if (!compareSync(credentials.password, u.accounts[0]?.hash)) return null;
          return u;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session(params) {
      return {
        ...params.session,
        id: params.user.id,
        // @ts-ignore
        role: "owner" || "params.user.role",
      };
    },
  },
  pages: {
    error: "/auth",
    newUser: "/auth",
    signIn: "/auth",
  },
};

export default NextAuth(authOptions);
