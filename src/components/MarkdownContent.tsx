"use client";

import { htmlToPdf } from "@/actions/html_to_pdf";
import Markdown from "@/components/Markdown";
import { getHtml } from "@/utils";
import { useEffect, useRef, useState } from "react";

type MarkdownContentProps = {
  markdown: string;
  fileName: string;
};

export default function MarkdownContent({
  markdown: initialMarkdown,
  fileName,
}: MarkdownContentProps) {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const markdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      <div className="flex justify-end gap-2">
        <button
          onClick={() => void downloadPdf()}
          className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          PDFをダウンロード
        </button>
        <button
          onClick={downloadMarkdown}
          className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Markdownをダウンロード
        </button>
        <button
          onClick={() => downloadHtml()}
          className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          HTMLをダウンロード
        </button>
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
