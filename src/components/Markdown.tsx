import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import "katex/dist/katex.min.css";

export default function Markdown({ markdown }: { markdown: string }) {
  return (
    <div className="bg-white p-4 rounded">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: (props) => <h1 className="text-3xl font-bold mb-4" {...props} />,
          h2: (props) => <h2 className="text-2xl font-bold mb-3" {...props} />,
          h3: (props) => <h3 className="text-xl font-bold mb-2" {...props} />,
          h4: (props) => <h4 className="text-lg font-bold mb-1" {...props} />,
          h5: (props) => <h5 className="text-base font-bold" {...props} />,
          h6: (props) => <h6 className="text-sm font-bold" {...props} />,
          p: (props) => (
            <p className="text-gray-800 leading-relaxed mb-1" {...props} />
          ),
          ul: (props) => <ul className="list-disc ml-6" {...props} />,
          ol: (props) => <ol className="list-decimal ml-6" {...props} />,
          li: (props) => <li className="mb-1" {...props} />,
          blockquote: (props) => (
            <blockquote
              className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4 my-4"
              {...props}
            />
          ),
          hr: (props) => <hr className="my-4 border-gray-500" {...props} />,
          pre: (props) => (
            <pre
              className="bg-gray-900 text-white p-4 rounded my-4"
              {...props}
            />
          ),
          code: (props) => (
            <code
              className="bg-gray-200 text-red-500 px-1 rounded"
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
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
