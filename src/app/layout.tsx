import type { Metadata } from "next";
import "./globals.css";

import AuthProvider from "@/app/_components/providers/auth-provider";

export const metadata: Metadata = {
  title: "TailorGrow",
  description: "Discover English fluency with AI-driven language learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='min-h-screen bg-first text-second-foreground leading-normal font-medium antialiased'>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
