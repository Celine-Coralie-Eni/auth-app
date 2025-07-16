import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/auth/signin", // Optional: you can create this page later
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id; // Make sure your `User` type includes `id`
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
