import { authOptions } from "@/auth";
import ClientPage from "@/components/ClientPage";
import DB from "@/db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    redirect("/login");
  }

  const user = await DB.getUserFromEmail(userEmail);
  if (!user) {
    redirect("/login");
  }

  return (
    <ClientPage userName={user.name} hasNotionToken={!!user.notion_token} />
  );
}
