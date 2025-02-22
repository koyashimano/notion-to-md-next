import { authOptions } from "@/auth";
import DB from "@/db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import ClientPage from "./client_page";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (userEmail) {
    const user = await DB.getUserFromEmail(userEmail);
    if (user) {
      redirect("/");
    }
  }

  return <ClientPage />;
}
