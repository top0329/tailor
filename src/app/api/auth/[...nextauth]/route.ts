import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import jwt from "jsonwebtoken";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "@/app/_helpers/server/prisma";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_EXPIRES,
  JWT_SECRET,
  NEXTAUTH_SECRET,
} from "@/constants/env";
import { cookies } from "next/headers";

const authOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: any) {
      const { email } = user;

      const auth = await prisma.user.findFirst({
        where: { email, registerType: { has: "google" }, emailVerified: true },
      });

      let token;

      if (!auth) {
        const newUser = await prisma.user.create({
          data: { email, registerType: ["google"], emailVerified: true },
        });
        token = jwt.sign({ sub: newUser.id }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES,
        });
      } else {
        token = jwt.sign({ sub: auth.id }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES,
        });
      }

      cookies().set("authorization", token, { httpOnly: true });

      return "/profile/invitation-code";
    },
  },
  secret: NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
