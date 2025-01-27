"use server";

import puppeteer from "puppeteer";

export async function htmlToPdf(html: string, css: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(`
<html>
	<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css" integrity="sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.js" integrity="sha384-Rma6DA2IPUwhNxmrB/7S3Tno0YY7sFu9WSYMCuulLhIqYSGZ2gKCJWIqhBWqMQfh" crossorigin="anonymous"></script>
    <style>
      body {
        font-size: 11px;
      }
    </style>
  </head>
	<body>
    ${html}
	</body>
</html>
`);
  await page.addStyleTag({ content: css });

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
