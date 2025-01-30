import NextAuthProvider from "@/providers/NextAuthProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notion to Markdown",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-gray-100 p-4">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
