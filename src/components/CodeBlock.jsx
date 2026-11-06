import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock({
  language,
  code,
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-slate-800 shadow-lg">

      {/* Header */}

      <div className="flex items-center justify-between bg-[#202327] px-5 py-3">

        <div className="flex items-center gap-4">

          {/* macOS buttons */}

          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
          </div>

          <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
            {language}
          </span>

        </div>

        <button
          onClick={copyCode}
          className="flex items-center gap-2 rounded-lg bg-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-600"
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>

      </div>

      {/* Code */}

      <pre className="overflow-x-auto bg-[#282c34] p-6 text-sm text-slate-100">
        <code className={`language-${language} font-mono`}>{code}</code>
      </pre>

    </div>
  );
}