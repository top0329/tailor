import Google from "next-auth/providers/google";

export const authOptions = {
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
      console.log(user);
      return "/profile/invitation-code";
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};
