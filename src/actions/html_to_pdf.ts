"use server";

import { getHtml } from "@/utils";
import puppeteer from "puppeteer";

export async function htmlToPdf(html: string, css: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(getHtml(html, css));

  await Promise.all([
    page.waitForNetworkIdle(),
    page.evaluate(() => history.pushState(undefined, "", "#")),
  ]);

  await page.emulateMediaType("screen");
  const pdfContent = await page.pdf({
    printBackground: true,
    format: "a4",
    margin: {
      top: "25mm",
      right: "25mm",
      bottom: "25mm",
      left: "25mm",
    },
  });

  await page.close();

  return pdfContent;
}
