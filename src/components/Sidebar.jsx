import { useMemo, useState } from "react";
import {
  GraduationCap,
  Search,
  BookOpen,
  Clock3,
  Plus,
} from "lucide-react";

export default function Sidebar({
  topics,
  activeTopic,
  setActiveTopic,
  onAddTopic,
}) {
  const [search, setSearch] = useState("");

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) =>
      topic.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, topics]);

  return (
    <aside className="flex h-screen w-80 flex-col border-r border-white/20 bg-gradient-to-b from-indigo-500 via-violet-500 to-cyan-500 p-5 text-white shadow-2xl backdrop-blur-xl">
      {/* Logo */}
      <div className="rounded-3xl bg-white/15 p-5 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-3">
            <GraduationCap className="h-8 w-8" />
          </div>

          <div>
            <h1 className="text-xl font-bold">AI Teacher</h1>
            <p className="text-sm text-white/80">
              Learn anything with AI
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mt-6">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70"
          size={18}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search topics..."
          className="w-full rounded-2xl border border-white/20 bg-white/15 py-3 pl-11 pr-4 text-white placeholder:text-white/60 outline-none backdrop-blur-xl transition focus:border-white/50"
        />
      </div>

      {/* Topics */}
      <div className="mt-6 flex-1 overflow-y-auto pr-1">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">
          Chapters
        </h2>

        <div className="space-y-3">
          {filteredTopics.map((topic, index) => {
            const active = activeTopic?.id === topic.id;

            return (
              <button
                key={index}
                onClick={() => setActiveTopic(topic)}
                className={`group w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                  active
                    ? "border-white/40 bg-white text-slate-900 shadow-xl scale-[1.02]"
                    : "border-white/10 bg-white/10 hover:bg-white/20"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div
                      className={`rounded-xl p-2 ${
                        active
                          ? "bg-indigo-100 text-indigo-600 h-fit"
                          : "bg-white/20 h-fit"
                      }`}
                    >
                      <BookOpen size={18} />
                    </div>

                    <div>
                      <p
                        className={`text-xs font-semibold ${
                          active
                            ? "text-indigo-600"
                            : "text-white/70"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-1 font-semibold">
                        {topic.title}
                      </h3>

                      <div
                        className={`mt-2 flex items-center gap-1 text-xs ${
                          active
                            ? "text-slate-500"
                            : "text-white/70"
                        }`}
                      >
                        <Clock3 size={14} />
                        {topic.duration}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

          {filteredTopics.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/30 p-6 text-center text-sm text-white/70">
              No topics found.
            </div>
          )}
        </div>
      </div>

      {/* Add Topic */}
      <button
        onClick={onAddTopic}
        className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-white py-3 font-semibold text-indigo-600 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        <Plus size={18} />
        Add Topic
      </button>
    </aside>
  );
}