import { AUTH_SECRET, JWT_EXPIRES } from "@/lib/constants";
import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import ms from "ms";
import jwt from "jsonwebtoken";
import Google from "next-auth/providers/google";
import { NextResponse } from "next/server";

const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: any) {
      const { email } = user;
      let tokenPayload;

      const existingUser = await prisma.user.findFirst({
        where: { email },
      });

      if (!existingUser) {
        const user = await prisma.user.create({
          data: {
            email,
            registerType: "google",
            emailVerified: true,
          },
        });
        tokenPayload = { user: user?.id };
      } else tokenPayload = { user: existingUser?.id };

      const res = NextResponse.json({ success: true, user }, { status: 200 });

      const token = jwt.sign(tokenPayload, AUTH_SECRET, {
        expiresIn: JWT_EXPIRES,
      });

      const expires = new Date();

      expires.setMilliseconds(expires.getMilliseconds() + ms(JWT_EXPIRES));

      // Set your custom cookie
      res.cookies.set("Authentication", token, {
        expires,
        secure: true,
        httpOnly: true,
      });

      return res;
    },
  },
  secret: AUTH_SECRET,
};

const handler = NextAuth({
  ...authOptions,
  callbacks: {
    ...authOptions.callbacks,
    async signIn({ user }: any) {
      const result = await authOptions.callbacks.signIn({ user });
      if (result instanceof NextResponse) {
        return true;
      }
      return result;
    },
  },
});

export { handler as GET, handler as POST };
