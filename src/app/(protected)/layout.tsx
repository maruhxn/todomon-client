import { getSession } from "@/apis/repository/global-action";
import Footer from "@/components/globals/Footer";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (!session) redirect("/");
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
