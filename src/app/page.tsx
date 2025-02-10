"use client";

import notionAuth from "@/actions/notion_auth";
import { notionToMarkdownAction } from "@/actions/notion_to_markdown";
import MarkdownContent from "@/components/MarkdownContent";
import { signOut, useSession } from "next-auth/react";
import { useActionState } from "react";
import { MdSend } from "react-icons/md";

export default function Page() {
  const [state, action, isPending] = useActionState(notionToMarkdownAction, {});
  const { data: session } = useSession();

  const result = state.result;

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="flex w-full items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">Notion Converter</h1>
          <div className="flex items-center gap-4">
            <form action={notionAuth}>
              <button
                type="submit"
                className="rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
              >
                Notionと連携
              </button>
            </form>
            {session && <p className="text-gray-900">{session.user?.name}</p>}
            <button
              className="rounded-md px-4 py-2 text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={() => void signOut()}
            >
              ログアウト
            </button>
          </div>
        </div>
      </header>

      <form action={action} className="space-y-4 p-4">
        <label className="block">
          NotionページのURL
          <div className="mt-2 flex items-center gap-2">
            <input
              type="text"
              name="url"
              defaultValue={state.data?.url}
              className="block flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-gray-600 disabled:text-gray-400 disabled:opacity-50"
              disabled={isPending}
            >
              <MdSend className="h-6 w-6" aria-label="送信" />
            </button>
          </div>
          {!isPending && state.errors?.url && (
            <p className="mt-2 text-sm text-gray-600">{state.errors.url}</p>
          )}
        </label>
        {!isPending && state.errors?.noField && (
          <p className="mt-2 text-sm text-gray-600">{state.errors.noField}</p>
        )}
      </form>

      {isPending && (
        <div className="mt-4 flex justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-gray-900" />
        </div>
      )}
      {!isPending && result && (
        <MarkdownContent
          markdown={result.markdown}
          fileName={result.fileName}
        />
      )}
    </div>
  );
}
