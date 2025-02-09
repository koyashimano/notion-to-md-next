"use client";

import { htmlToPdf } from "@/actions/html_to_pdf";
import Markdown from "@/components/Markdown";
import { getHtml } from "@/utils";
import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (
        textareaRef.current &&
        textareaRef.current.scrollHeight > textareaRef.current.clientHeight
      ) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [markdown]);

  const downloadPdf = async () => {
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

  const downloadHtml = () => {
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

  const downloadMarkdown = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName}.md`;
    element.click();
  };

  return (
    <>
      <div className="flex items-start justify-between gap-2">
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
            onClick={() => void downloadPdf()}
            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:opacity-50"
            disabled={!isFileNameValid}
          >
            PDF
          </button>
          <button
            onClick={downloadMarkdown}
            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:opacity-50"
            disabled={!isFileNameValid}
          >
            Markdown
          </button>
          <button
            onClick={() => downloadHtml()}
            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:opacity-50"
            disabled={!isFileNameValid}
          >
            HTML
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        <textarea
          ref={textareaRef}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="mb-4 w-full flex-1 resize-none rounded-md p-2 focus:outline-none focus:ring-0"
        />
        <div className="flex-1">
          <Markdown ref={markdownRef} markdown={markdown} />
        </div>
      </div>
    </>
  );
}
