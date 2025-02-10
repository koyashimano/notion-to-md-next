"use client";

import toast from "react-hot-toast";

import { htmlToPdf } from "./actions/html_to_pdf";
import { getHtml } from "./utils";

export const downloadPdf = async (html: string, fileName: string) => {
  const toastId = toast.loading("ダウンロード中...");
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

    toast.success("ダウンロードしました", { id: toastId });
  } catch (e) {
    console.error(e);
    toast.error("ダウンロードに失敗しました", { id: toastId });
  }
};

export const downloadHtml = (html: string, fileName: string) => {
  const toastId = toast.loading("ダウンロード中...");
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

    toast.success("ダウンロードしました", { id: toastId });
  } catch (e) {
    console.error(e);
    toast.error("ダウンロードに失敗しました", { id: toastId });
  }
};

export const downloadMarkdown = (markdown: string, fileName: string) => {
  const toastId = toast.loading("ダウンロード中...");
  try {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName}.md`;
    element.click();

    toast.success("ダウンロードしました", { id: toastId });
  } catch (e) {
    console.error(e);
    toast.error("ダウンロードに失敗しました", { id: toastId });
  }
};
