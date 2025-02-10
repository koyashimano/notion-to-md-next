"use client";

import { htmlToPdf } from "./actions/html_to_pdf";
import { getHtml } from "./utils";

export const downloadPdf = async (html: string, fileName: string) => {
  try {
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

export const downloadHtml = (html: string, fileName: string) => {
  try {
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

export const downloadMarkdown = (markdown: string, fileName: string) => {
  const element = document.createElement("a");
  const file = new Blob([markdown], { type: "text/markdown" });
  element.href = URL.createObjectURL(file);
  element.download = `${fileName}.md`;
  element.click();
};
