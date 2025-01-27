"use client";

import { htmlToPdf } from "@/actions/html_to_pdf";
import { notionToMarkdownAction } from "@/actions/notion_to_markdown";
import Markdown from "@/components/Markdown";
import { useActionState, useRef } from "react";

export default function Page() {
  const [state, action, isPending] = useActionState(notionToMarkdownAction, {});

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

  return (
    <div className="flex flex-col gap-4">
      <form action={action} className="space-y-4">
        <label className="block">
          NotionページのURL
          <input
            type="text"
            name="url"
            defaultValue={state.data?.url}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {!isPending && state.errors?.auth && (
            <p className="mt-2 text-sm text-red-600">{state.errors.auth}</p>
          )}
        </label>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:opacity-50"
          disabled={isPending}
        >
          送信
        </button>
        {!isPending && state.errors?.noField && (
          <p className="mt-2 text-sm text-red-600">{state.errors.noField}</p>
        )}
      </form>

      {isPending && (
        <div className="flex justify-center mt-4">
          <div className="w-5 h-5 border-4 border-t-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin" />
        </div>
      )}
      {!isPending && result && (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => void downloadPdf(result.fileName)}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Markdownをダウンロード
          </button>
        </div>
      )}
      {!isPending && result && (
        <Markdown ref={markdownRef} markdown={result.markdown} />
      )}
    </div>
  );
}
