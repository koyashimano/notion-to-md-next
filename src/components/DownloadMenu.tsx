"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaDownload } from "react-icons/fa";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return isDesktop ? (
    <div className="flex items-center gap-2">
      <FaDownload className="mr-1 text-green-400" />
      <button
        onClick={downloadPdf}
        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:opacity-50"
        disabled={disabled}
      >
        PDF
      </button>
      <button
        onClick={downloadMarkdown}
        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:opacity-50"
        disabled={disabled}
      >
        Markdown
      </button>
      <button
        onClick={downloadHtml}
        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:opacity-50"
        disabled={disabled}
      >
        HTML
      </button>
    </div>
  ) : (
    <button ref={menuButtonRef} onClick={() => setIsMenuOpen(!isMenuOpen)}>
      <FaDownload className="mr-1 text-green-400" />
      {isMenuOpen &&
        createPortal(
          <div>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsMenuOpen(false)}
            />
            <div
              className="absolute z-20 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
              style={{
                top: menuButtonRef.current?.getBoundingClientRect().bottom,
                right:
                  document.body.getBoundingClientRect().width -
                  (menuButtonRef.current?.getBoundingClientRect().right ?? 0),
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-1" role="menu">
                <button
                  onClick={() => {
                    downloadPdf();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  PDF
                </button>
                <button
                  onClick={() => {
                    downloadMarkdown();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Markdown
                </button>
                <button
                  onClick={() => {
                    downloadHtml();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  HTML
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </button>
  );
}
