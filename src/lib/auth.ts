import {    PrismaClient    } from '@prisma/client';
import { compare, hash } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const prisma = new PrismaClient();
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
            }
            const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            });
            if (!user) {
            throw new Error("No user found with the given email");
            }
            if (!user) return null;
            const isValid = await compare(credentials.password, user.password);
            if (!isValid) {
            throw new Error("Invalid password");
            }
            return { id: String(user.id), email: user.email, name: user.name||"" };
        },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
}; 

        