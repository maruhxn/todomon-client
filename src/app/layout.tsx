import { getAuthRequest } from "@/apis/repository/auth.repository";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Todomon",
  description: "투두몬",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userInfo = await getAuthRequest();

  return (
    <html lang="ko">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <Header userInfo={userInfo} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
