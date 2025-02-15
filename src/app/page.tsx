import { authOptions } from "@/auth";
import ClientPage from "@/components/ClientPage";
import DB from "@/db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    redirect("/login");
  }

  const user = await DB.getUserFromId(userId);
  if (!user) {
    redirect("/login");
  }

  return (
    <ClientPage userName={user.name} hasNotionToken={!!user.notion_token} />
  );
}
