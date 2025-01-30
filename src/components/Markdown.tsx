import rehypeKatex from "@/customRehypeKatex";
import { Ref } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import "katex/dist/katex.min.css";

export default function Markdown({
  markdown,
  ref,
}: {
  markdown: string;
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div ref={ref} className="rounded bg-white p-4">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: (props) => <h1 className="mb-4 text-3xl font-bold" {...props} />,
          h2: (props) => <h2 className="mb-3 text-2xl font-bold" {...props} />,
          h3: (props) => <h3 className="mb-2 text-xl font-bold" {...props} />,
          h4: (props) => <h4 className="mb-1 text-lg font-bold" {...props} />,
          h5: (props) => <h5 className="text-base font-bold" {...props} />,
          h6: (props) => <h6 className="text-sm font-bold" {...props} />,
          p: (props) => (
            <p className="mb-1 leading-relaxed text-gray-800" {...props} />
          ),
          ul: (props) => <ul className="ml-6 list-disc" {...props} />,
          ol: (props) => <ol className="ml-6 list-decimal" {...props} />,
          li: (props) => <li className="mb-1" {...props} />,
          blockquote: (props) => (
            <blockquote
              className="my-4 border-l-4 border-gray-500 bg-gray-100 p-4 text-gray-700"
              {...props}
            />
          ),
          hr: (props) => <hr className="my-4 border-gray-500" {...props} />,
          pre: (props) => (
            <pre
              className="my-4 rounded bg-gray-900 p-4 text-white"
              {...props}
            />
          ),
          code: (props) => (
            <code
              className="rounded bg-gray-200 px-1 text-red-500"
              {...props}
            />
          ),
          a: (props) => (
            <a
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          img: (props) => <img className="my-4" {...props} />,
          table: (props) => (
            <div className="overflow-x-auto">
              <table className="border" {...props} />
            </div>
          ),
          thead: (props) => <thead className="border bg-gray-300" {...props} />,
          tbody: (props) => <tbody className="border" {...props} />,
          tr: (props) => <tr className="border" {...props} />,
          th: (props) => (
            <th className="border p-2 text-left font-bold" {...props} />
          ),
          td: (props) => <td className="border p-2" {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
