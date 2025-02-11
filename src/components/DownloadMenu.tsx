"use client";

import { FaDownload } from "react-icons/fa";

import ButtonMenu from "./ButtonMenu";

type DownloadMenuProps = {
  downloadPdf: () => void;
  downloadMarkdown: () => void;
  downloadHtml: () => void;
  disabled: boolean;
  isDesktop: boolean;
};

export default function DownloadMenu({
  downloadPdf,
  downloadMarkdown,
  downloadHtml,
  disabled,
  isDesktop,
}: DownloadMenuProps) {
  return isDesktop ? (
    <div className="flex items-center gap-2">
      <FaDownload className="mr-1 text-gray-600" />
      <button
        onClick={downloadPdf}
        className="inline-flex justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:opacity-50"
        disabled={disabled}
      >
        PDF
      </button>
      <button
        onClick={downloadMarkdown}
        className="inline-flex justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:opacity-50"
        disabled={disabled}
      >
        Markdown
      </button>
      <button
        onClick={downloadHtml}
        className="inline-flex justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:opacity-50"
        disabled={disabled}
      >
        HTML
      </button>
    </div>
  ) : (
    <ButtonMenu
      disabled={disabled}
      options={[
        { label: "PDF", onClick: downloadPdf },
        { label: "Markdown", onClick: downloadMarkdown },
        { label: "HTML", onClick: downloadHtml },
      ]}
    >
      <FaDownload className="mr-1 text-gray-600" />
    </ButtonMenu>
  );
}
