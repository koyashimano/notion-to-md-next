"use server";

import { notionToMarkdown } from "@/notion-to-md/notion_to_markdown";
import { getFileName, getPageId } from "@/notion-to-md/utils";
import { State } from "@/types";
import { Client } from "@notionhq/client";
import { z } from "zod";

const formSchema = z.object({
  url: z.string().url({ message: "正しいURLを入力してください。" }),
  auth: z.string().min(1, { message: "この項目は必須です。" }),
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
        auth: (formData.get("auth") ?? "") as string,
      },
      errors: validated.error.flatten().fieldErrors,
    };
  }
  const { url, auth } = validated.data;

  try {
    const pageId = getPageId(url);
    const notion = new Client({ auth });
    const fileName = await getFileName(pageId, notion);
    const markdown = await notionToMarkdown({
      pageId,
      notion,
      options: { saveImage: false },
    });

    return { data: { url, auth }, result: { markdown, fileName } };
  } catch {
    return {
      data: { url, auth },
      errors: {
        noField: ["マークダウンへの変換に失敗しました。"],
      },
    };
  }
}
