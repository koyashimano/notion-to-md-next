"use server";

import { authOptions } from "@/auth";
import DB from "@/db";
import { randomBytes } from "crypto";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function notionAuth() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const user = userEmail && (await DB.getUserFromEmail(userEmail));

  if (!userEmail || !user) {
    throw new Error("ユーザーが認証されていません。"); // TODO: handle errors
  }

  const state = randomBytes(16).toString("hex");
  await DB.deleteAndCreateNotionAuthState(user.id, state);

  const notionAuthUrl = new URL("https://api.notion.com/v1/oauth/authorize");
  notionAuthUrl.searchParams.set("client_id", process.env.NOTION_CLIENT_ID!);
  notionAuthUrl.searchParams.set("response_type", "code");
  notionAuthUrl.searchParams.set("owner", "user");
  notionAuthUrl.searchParams.set(
    "redirect_uri",
    process.env.NOTION_REDIRECT_URI!
  );
  notionAuthUrl.searchParams.set("state", state);

  redirect(notionAuthUrl.toString());
}
