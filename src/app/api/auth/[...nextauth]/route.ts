import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import { useRouter } from "next/navigation";

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
  // callbacks: {
  //   async signIn({ user, account, profile, credentials }: unknown) {
  //     // const router = useRouter();
  //     console.log(
  //       "Sign in callback called",
  //       user,
  //       account,
  //       profile,
  //       credentials
  //     );
  //     // if (user) redirect("/otpverification");
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET!,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
