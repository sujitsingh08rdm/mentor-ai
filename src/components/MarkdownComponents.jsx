import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy } from "lucide-react";
import CodeBlock from "./CodeBlock";

export const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="mb-6 mt-10 bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-4xl font-extrabold text-transparent">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 border-b border-slate-200 pb-2 text-3xl font-bold text-slate-900">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-2xl font-bold text-slate-800">
      {children}
    </h3>
  ),

  h4: ({ children }) => (
    <h4 className="mt-6 mb-3 text-xl font-semibold text-slate-800">
      {children}
    </h4>
  ),

  p: ({ children }) => (
    <p className="my-5 leading-8 text-slate-700">{children}</p>
  ),

  ul: ({ children }) => (
    <ul className="my-5 ml-6 list-disc space-y-2 text-slate-700">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="my-5 ml-6 list-decimal space-y-2 text-slate-700">
      {children}
    </ol>
  ),

  li: ({ children }) => <li>{children}</li>,

  strong: ({ children }) => (
    <strong className="font-bold text-slate-900">{children}</strong>
  ),

  em: ({ children }) => (
    <em className="italic text-slate-700">{children}</em>
  ),

  hr: () => <hr className="my-10 border-slate-200" />,

  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-r-2xl border-l-4 border-indigo-500 bg-indigo-50 p-5 italic text-slate-700">
      {children}
    </blockquote>
  ),

  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full border-collapse">
        {children}
      </table>
    </div>
  ),

  th: ({ children }) => (
    <th className="border bg-slate-100 px-5 py-3 text-left font-semibold">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="border px-5 py-3">{children}</td>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-indigo-600 underline underline-offset-4"
    >
      {children}
    </a>
  ),

  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      className="my-8 rounded-2xl shadow-xl"
    />
  ),

  code({ inline, className, children }) {
    const match = /language-(\w+)/.exec(className || "");
    const language = match?.[1] || "javascript";
    const code = String(children).replace(/\n$/, "");

    if (inline) {
      return (
        <code className="rounded bg-slate-200 px-1.5 py-1 font-mono text-sm text-pink-600">
          {children}
        </code>
      );
    }

    return (
      <CodeBlock
        language={language}
        code={code}
      />
    );
  },
};