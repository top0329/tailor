import { AUTH_SECRET } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
          data: { email, registerType: "google", emailVerified: true },
        });

      return "/profile/invitation-code";
    },
  },
  secret: AUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
