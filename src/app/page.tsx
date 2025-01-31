"use client";

import { htmlToPdf } from "@/actions/html_to_pdf";
import notionAuth from "@/actions/notion_auth";
import { notionToMarkdownAction } from "@/actions/notion_to_markdown";
import Markdown from "@/components/Markdown";
import { getHtml } from "@/utils";
import { signOut, useSession } from "next-auth/react";
import { useActionState, useRef } from "react";

export default function Page() {
  const [state, action, isPending] = useActionState(notionToMarkdownAction, {});
  const { data: session } = useSession();

  const markdownRef = useRef<HTMLDivElement>(null);

  const result = state.result;

  const downloadPdf = async (fileName: string) => {
    try {
      const html = markdownRef.current?.outerHTML;
      if (!html) {
        return;
      }
      const css = Array.from(document.styleSheets)
        .map((sheet) =>
          Array.from(sheet.cssRules)
            .map((rule) => rule.cssText)
            .join("")
        )
        .join("");

      const pdfContent = await htmlToPdf(html, css);
      const file = new Blob([pdfContent], { type: "application/pdf" });
      const url = URL.createObjectURL(file);
      const element = document.createElement("a");
      element.href = url;
      element.download = `${fileName}.pdf`;
      element.click();
    } catch (e) {
      console.error(e);
    }
  };

  const downloadHtml = (fileName: string) => {
    try {
      const html = markdownRef.current?.outerHTML;
      if (!html) {
        return;
      }
      const css = Array.from(document.styleSheets)
        .map((sheet) =>
          Array.from(sheet.cssRules)
            .map((rule) => rule.cssText)
            .join("")
        )
        .join("");

      const htmlContent = getHtml(html, css);
      const file = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(file);
      const element = document.createElement("a");
      element.href = url;
      element.download = `${fileName}.html`;
      element.click();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end gap-4 bg-gray-100">
        <form action={notionAuth}>
          <button
            type="submit"
            className="text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Notionと連携
          </button>
        </form>
        {session && <p className="text-gray-700">{session.user?.name}</p>}
        <button
          className="text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => void signOut()}
        >
          ログアウト
        </button>
      </div>
      <form action={action} className="space-y-4">
        <label className="block">
          NotionページのURL
          <input
            type="text"
            name="url"
            defaultValue={state.data?.url}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          {!isPending && state.errors?.url && (
            <p className="mt-2 text-sm text-red-600">{state.errors.url}</p>
          )}
        </label>
        <label className="block">
          Notion APIトークン
          <input
            type="password"
            name="auth"
            defaultValue={state.data?.auth}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          {!isPending && state.errors?.auth && (
            <p className="mt-2 text-sm text-red-600">{state.errors.auth}</p>
          )}
        </label>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:opacity-50"
          disabled={isPending}
        >
          送信
        </button>
        {!isPending && state.errors?.noField && (
          <p className="mt-2 text-sm text-red-600">{state.errors.noField}</p>
        )}
      </form>

      {isPending && (
        <div className="mt-4 flex justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-indigo-600" />
        </div>
      )}
      {!isPending && result && (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => void downloadPdf(result.fileName)}
            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            PDFをダウンロード
          </button>
          <button
            onClick={() => {
              const element = document.createElement("a");
              const file = new Blob([result.markdown], {
                type: "text/markdown",
              });
              element.href = URL.createObjectURL(file);
              element.download = `${result.fileName}.md`;
              element.click();
            }}
            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Markdownをダウンロード
          </button>
          <button
            onClick={() => downloadHtml(result.fileName)}
            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            HTMLをダウンロード
          </button>
        </div>
      )}
      {!isPending && result && (
        <Markdown ref={markdownRef} markdown={result.markdown} />
      )}
    </div>
  );
}
