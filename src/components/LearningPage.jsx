import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Sparkles,
  GraduationCap,
  Languages,
  Clock3,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";

import { markdownComponents } from "./MarkdownComponents";
import { useEffect, useState } from "react";
import { httpRequest } from "../lib/http-request";

export function toMarkdownNumberedList(items = []) {
  return [
    ...items.map((item, index) => `${index + 1}. ${item.trim()}`),
    "",
    "---",
    "",
    "",
    "**Start learning by clicking on Next Button.**",
  ].join("\n");
}

export default function LearningPage({ topic, topics, setActiveTopic }) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [chapterContent, setChapterContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCurrentChapterIndex(0);
    setChapterContent(null);
  }, [topic]);

  const getChapter = async (button, item) => {
    try {
      setIsLoading(true);
      let index = currentChapterIndex;
      const size = item.chapters.length;
      const name = item.chapters[index];

      const { data } = await httpRequest.post("/chapter", {
        name,
        topic: item.id,
      });
      setChapterContent(data.content);
      if (button === "NEXT") {
        if (index >= size - 1) {
          return;
        }
        index++;
      }

      if (button === "PREV") {
        if (index <= 0) {
          return;
        }
        index--;
      }

      setCurrentChapterIndex(index);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex items-center gap-2 text-2xl font-medium text-indigo-500">
          <Loader2 className="animate-spin" /> Loading...
        </div>
      </div>
    );
  }

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

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50">
      {/* Scrollable Area */}

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl p-8">
          {/* Hero */}

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 p-8 text-white shadow-lg">
            <div className="relative z-10">
              <div className="mb-6 inline-flex rounded-full bg-white/20 px-4 py-2">
                <Sparkles className="mr-2 h-4 w-4" />
                AI Powered Learning
              </div>

              <h1 className="text-5xl font-extrabold leading-tight capitalize">
                {topic.name || topic.title}
              </h1>

              <p className="mt-4 max-w-3xl text-lg text-white/90">
                {topic.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className=" capitalize flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                  <GraduationCap size={18} />
                  {topic.level}
                </div>

                <div className="capitalize flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                  <Languages size={18} />
                  {topic.language}
                </div>
              </div>
            </div>
          </div>

          {/* Markdown */}

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {chapterContent
                ? chapterContent
                : toMarkdownNumberedList(topic.chapters)}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}

      <div className="border-t border-slate-200 bg-white p-5">
        <div className="mx-auto flex max-w-5xl gap-4">
          <button
            onClick={() => getChapter("PREV", topic)}
            className={`cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 font-semibold bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 active:scale-95`}
          >
            <ChevronLeft />
            Previous Chapter
          </button>

          <button
            onClick={() => getChapter("NEXT", topic)}
            className={`cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 font-semibold bg-linear-to-r from-cyan-500 to-indigo-600 text-white shadow-lg transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 active:scale-95`}
          >
            Next Chapter
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
