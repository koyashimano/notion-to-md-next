"use server";

import { authOptions } from "@/auth";
import { prisma } from "@/db";
import { notionToMarkdown } from "@/notion-to-md/notion_to_markdown";
import { getFileName, getPageId } from "@/notion-to-md/utils";
import { State } from "@/types";
import { Client } from "@notionhq/client";
import { getServerSession } from "next-auth";
import { z } from "zod";

const formSchema = z.object({
  url: z.string().url({ message: "正しいURLを入力してください。" }),
});

export async function notionToMarkdownAction(
  _: State,
  formData: FormData
): Promise<State> {
  const validated = formSchema.safeParse(Object.fromEntries(formData));
  if (!validated.success) {
    return {
      data: {
        url: (formData.get("url") ?? "") as string,
      },
      errors: validated.error.flatten().fieldErrors,
    };
  }
  const { url } = validated.data;

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return {
      data: { url },
      errors: {
        noField: ["ユーザーが認証されていません。"],
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  const notionAuthToken = user?.notion_token;
  if (!notionAuthToken) {
    return {
      data: { url },
      errors: {
        noField: ["NotionのAPIトークンを取得できませんでした。"],
      },
    };
  }

  try {
    const pageId = getPageId(url);
    const notion = new Client({ auth: notionAuthToken });
    const fileName = await getFileName(pageId, notion);
    const markdown = await notionToMarkdown({
      pageId,
      notion,
      options: { saveImage: false },
    });

    return { data: { url }, result: { markdown, fileName } };
  } catch {
    return {
      data: { url },
      errors: {
        noField: ["マークダウンへの変換に失敗しました。"],
      },
    };
  }
}
