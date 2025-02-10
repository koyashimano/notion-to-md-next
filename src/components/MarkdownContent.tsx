"use client";

import Markdown from "@/components/Markdown";
import { downloadHtml, downloadMarkdown, downloadPdf } from "@/download";
import { useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";

type MarkdownContentProps = {
  markdown: string;
  fileName: string;
};

export default function MarkdownContent({
  markdown: initialMarkdown,
  fileName: initialFileName,
}: MarkdownContentProps) {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [fileName, setFileName] = useState(initialFileName);
  const markdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isFileNameValid = !/\.(md|pdf|html)$/i.test(fileName);

  return (
    <>
      <div className="flex items-start justify-between gap-2 p-4">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="fileName">ファイル名</label>
          <input
            id="fileName"
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="max-w-md rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          <p
            className={
              "text-xs " + (isFileNameValid ? "text-gray-500" : "text-red-500")
            }
          >
            拡張子を除く
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FaDownload className="mr-1 text-green-400" />
          <button
            onClick={() =>
              markdownRef.current &&
              void downloadPdf(markdownRef.current.outerHTML, fileName)
            }
            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:opacity-50"
            disabled={!isFileNameValid}
          >
            PDF
          </button>
          <button
            onClick={() => downloadMarkdown(markdown, fileName)}
            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:opacity-50"
            disabled={!isFileNameValid}
          >
            Markdown
          </button>
          <button
            onClick={() =>
              markdownRef.current &&
              downloadHtml(markdownRef.current.outerHTML, fileName)
            }
            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:opacity-50"
            disabled={!isFileNameValid}
          >
            HTML
          </button>
        </div>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="flex h-full w-full flex-1 flex-col">
          <div className="border-b border-gray-300 p-4 pb-2">
            <button className="rounded-md px-4 py-2 hover:bg-gray-50">
              Markdown
            </button>
          </div>
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full flex-1 resize-none rounded-md p-4 focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-gray-300 p-4 pb-2">
            <button className="rounded-md px-4 py-2 hover:bg-gray-50">
              プレビュー
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Markdown ref={markdownRef} markdown={markdown} />
          </div>
        </div>
      </div>
    </>
  );
}
