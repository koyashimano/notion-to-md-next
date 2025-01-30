import { prisma } from "@/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  if (!code || !state) {
    return NextResponse.json(
      { error: "認証コードを取得できませんでした。" },
      { status: 400 }
    );
  }

  const notionAuthState = await prisma.notionAuthState.findUnique({
    where: {
      state: state,
      created_at: { gt: new Date(Date.now() - 60 * 60 * 1000) },
    },
  });
  if (!notionAuthState) {
    return NextResponse.json(
      { error: "ユーザーを取得できませんでした。" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      "https://api.notion.com/v1/oauth/token",
      {
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NOTION_REDIRECT_URI,
      },
      {
        auth: {
          username: process.env.NOTION_CLIENT_ID!,
          password: process.env.NOTION_CLIENT_SECRET!,
        },
        headers: {
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
      }
    );

    const accessToken: string = response.data.access_token;
    await prisma.user.update({
      where: { id: notionAuthState.user_id },
      data: { notion_token: accessToken },
    });
    await prisma.notionAuthState.delete({ where: { state } });

    return NextResponse.redirect(new URL("/", request.url));
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { error: "認証コードを取得できませんでした。" },
      { status: 500 }
    );
  }
}
