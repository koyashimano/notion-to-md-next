"use client";

import { notionToMarkdownAction } from "@/actions/notion_to_markdown";
import Markdown from "@/components/Markdown";
import { useActionState } from "react";

export default function Page() {
  const [state, action, isPending] = useActionState(notionToMarkdownAction, {});

  const result = state.result;

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
        <div className="flex justify-end">
          <button
            onClick={() => {
              const element = document.createElement("a");
              const file = new Blob([result.markdown], {
                type: "text/markdown",
              });
              element.href = URL.createObjectURL(file);
              element.download = result.fileName;
              element.click();
            }}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            ダウンロード
          </button>
        </div>
      )}
      {!isPending && result && <Markdown markdown={result.markdown} />}
    </div>
  );
}
