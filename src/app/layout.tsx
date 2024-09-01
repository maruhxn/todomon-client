import { getAuthRequest } from "@/apis/repository/auth.repository";
import Footer from "@/components/globals/Footer";
import Header from "@/components/globals/Header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Gowun_Dodum } from "next/font/google";
import "./globals.css";

const fontHeading = Gowun_Dodum({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Gowun_Dodum({
  subsets: ["latin"],
  weight: "400",
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
        className={cn(
          "antialiased pb-20",
          fontHeading.variable,
          fontBody.variable
        )}
      >
        <Header userInfo={userInfo} />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
