import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { prisma } from "@/app/_helpers/server/prisma";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET,
} from "@/constants/env";

const authOptions = {
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
        where: { email },
      });

      if (!auth)
        await prisma.user.create({
          data: { email, registerType: ["google"], emailVerified: true },
        });

      return "/profile/invitation-code";
    },
  },
  secret: NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
