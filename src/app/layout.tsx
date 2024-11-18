import type { Metadata } from "next";
import "./globals.css";

import AuthProvider from "@/app/_components/providers/auth-provider";
import ToastProvider from "./_components/providers/toast-provider";
import { importExcel } from "@/scripts/import-xlsx";
import { dirname } from "path";

export const metadata: Metadata = {
  title: "TailorGrow",
  description: "Discover English fluency with AI-driven language learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  importExcel("public/_static/data.xlsx", "2023 6ERW1W2W3");
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='min-h-screen bg-first text-second-foreground leading-normal font-medium antialiased'>
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
