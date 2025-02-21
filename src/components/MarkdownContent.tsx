"use client";

import Markdown from "@/components/Markdown";
import { downloadHtml, downloadMarkdown, downloadPdf } from "@/download";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useRef, useState } from "react";

import DownloadMenu from "./DownloadMenu";

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

  const windowWidth = useWindowWidth();
  const [activeTab, setActiveTab] = useState<"markdown" | "preview">(
    "markdown"
  );

  const isDesktop = windowWidth > 768;

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
            className="max-w-md rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
          />
          <p
            className={
              "text-xs " + (isFileNameValid ? "text-gray-500" : "text-red-500")
            }
          >
            拡張子を除く
          </p>
        </div>
        <DownloadMenu
          downloadPdf={() =>
            markdownRef.current &&
            void downloadPdf(markdownRef.current.outerHTML, fileName)
          }
          downloadMarkdown={() => void downloadMarkdown(markdown, fileName)}
          downloadHtml={() =>
            markdownRef.current &&
            void downloadHtml(markdownRef.current.outerHTML, fileName)
          }
          disabled={!isFileNameValid}
          isDesktop={isDesktop}
        />
      </div>
      <div className={"flex px-2" + (isDesktop ? " justify-evenly" : "")}>
        <div className={isDesktop ? "flex-1" : ""}>
          <button
            className={
              "rounded-md px-4 py-2 hover:bg-gray-50" +
              (!isDesktop && activeTab !== "markdown" ? " text-gray-400" : "")
            }
            onClick={() => setActiveTab("markdown")}
          >
            Markdown
          </button>
        </div>
        <div className={isDesktop ? "flex-1" : ""}>
          <button
            className={
              "rounded-md px-4 py-2 hover:bg-gray-50" +
              (!isDesktop && activeTab !== "preview" ? " text-gray-400" : "")
            }
            onClick={() => setActiveTab("preview")}
          >
            プレビュー
          </button>
        </div>
      </div>
      <div className="mt-2 flex min-h-0 flex-1 border-t border-gray-300">
        <div
          className={
            "flex h-full w-full flex-1 flex-col" +
            (!isDesktop && activeTab !== "markdown" ? " hidden" : "")
          }
        >
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full flex-1 resize-none rounded-md p-4 focus:outline-none focus:ring-0"
          />
        </div>
        {isDesktop && <div className="w-px bg-gray-300" />}
        <div
          className={
            "flex min-w-0 flex-1 flex-col" +
            (!isDesktop && activeTab !== "preview" ? " hidden" : "")
          }
        >
          <div className="flex-1 overflow-y-auto">
            <Markdown ref={markdownRef} markdown={markdown} />
          </div>
        </div>
      </div>
    </>
  );
}
