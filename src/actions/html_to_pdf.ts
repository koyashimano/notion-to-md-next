"use server";

import { getHtml } from "@/utils";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export async function htmlToPdf(html: string, css: string) {
  if (process.env.CHROMIUM_FONT) {
    await chromium.font(process.env.CHROMIUM_FONT);
  }
  const browser = await puppeteer.launch(
    process.env.CHROME_EXECUTABLE_PATH
      ? {
          executablePath: process.env.CHROME_EXECUTABLE_PATH,
        }
      : {
          args: [...chromium.args, "--no-sandbox"],
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          headless: true,
        }
  );
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
