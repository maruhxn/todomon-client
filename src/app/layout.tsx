import { getSession } from "@/apis/repository/global-action";
import Header from "@/components/globals/Header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
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
  const userInfo = await getSession();
  return (
    <html lang="ko">
      <body
        className={cn(
          "antialiased pt-16 pb-20",
          fontHeading.variable,
          fontBody.variable
        )}
      >
        <Header userInfo={userInfo} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
