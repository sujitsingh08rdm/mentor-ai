import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Sparkles,
  GraduationCap,
  Languages,
  Clock3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { markdownComponents } from "./MarkdownComponents";

export default function LearningPage({
  topic,
  topics,
  setActiveTopic,
}) {
  if (!topic) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center shadow-sm">
          <Sparkles className="mx-auto mb-4 h-12 w-12 text-indigo-500" />
          <h2 className="text-2xl font-bold text-slate-800">
            Welcome to AI Teacher
          </h2>
          <p className="mt-2 text-slate-500">
            Select a topic from the sidebar to begin learning.
          </p>
        </div>
      </div>
    );
  }

  const currentIndex = topics.findIndex(
    (t) => t.id === topic.id
  );

  const previousTopic =
    currentIndex > 0 ? topics[currentIndex - 1] : null;

  const nextTopic =
    currentIndex < topics.length - 1
      ? topics[currentIndex + 1]
      : null;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50">

      {/* Scrollable Area */}

      <div className="flex-1 overflow-y-auto">

        <div className="mx-auto max-w-5xl p-8">

          {/* Hero */}

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 p-8 text-white shadow-2xl">

            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10">

              <div className="mb-6 inline-flex rounded-full bg-white/20 px-4 py-2 backdrop-blur">
                <Sparkles className="mr-2 h-4 w-4" />
                AI Powered Learning
              </div>

              <h1 className="text-5xl font-extrabold leading-tight">
                {topic.title}
              </h1>

              <p className="mt-4 max-w-3xl text-lg text-white/90">
                Learn step-by-step with AI-generated
                explanations, examples, summaries and quizzes.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur">
                  <GraduationCap size={18} />
                  {topic.level}
                </div>

                <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur">
                  <Languages size={18} />
                  {topic.language}
                </div>

                <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur">
                  <Clock3 size={18} />
                  {topic.duration}
                </div>

              </div>

            </div>

          </div>

          {/* Markdown */}

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {topic.content}
            </ReactMarkdown>

          </div>

        </div>

      </div>

      {/* Bottom Navigation */}

      <div className="border-t border-slate-200 bg-white/80 p-5 backdrop-blur-xl">

        <div className="mx-auto flex max-w-5xl gap-4">

          <button
            disabled={!previousTopic}
            onClick={() =>
              previousTopic &&
              setActiveTopic(previousTopic)
            }
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 font-semibold transition-all duration-300 ${
              previousTopic
                ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg hover:-translate-y-1"
                : "cursor-not-allowed bg-slate-200 text-slate-400"
            }`}
          >
            <ChevronLeft />
            Previous Chapter
          </button>

          <button
            disabled={!nextTopic}
            onClick={() =>
              nextTopic &&
              setActiveTopic(nextTopic)
            }
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 font-semibold transition-all duration-300 ${
              nextTopic
                ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg hover:-translate-y-1"
                : "cursor-not-allowed bg-slate-200 text-slate-400"
            }`}
          >
            Next Chapter
            <ChevronRight />
          </button>

        </div>

      </div>

    </div>
  );
}