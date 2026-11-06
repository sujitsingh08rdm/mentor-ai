import { useMemo, useState } from "react";
import { GraduationCap, Search, Plus, Pencil, Trash2 } from "lucide-react";

export default function Sidebar({
  topics,
  activeTopic,
  setActiveTopic,
  onAddTopic,
  onEditTopic,
  onDeleteTopic,
  isLoading,
}) {
  const [search, setSearch] = useState("");

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) =>
      topic.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, topics]);

  return (
    <aside className="flex h-screen w-80 flex-col border-r border-white/20 bg-gradient-to-b from-indigo-500 via-violet-500 to-cyan-500 p-5 text-white shadow-2xl">
      {/* Logo */}
      <div className="rounded-3xl bg-white/15 p-5">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-3">
            <GraduationCap className="h-8 w-8" />
          </div>

          <div>
            <h1 className="text-xl font-bold">AI Teacher</h1>
            <p className="text-sm text-white/80">Learn anything with AI</p>
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
          className="w-full rounded-2xl border border-white/20 bg-white/15 py-3 pl-11 pr-4 text-white placeholder:text-white/60 outline-none transition-colors focus:border-white/50"
        />
      </div>

      {/* Topics */}
      <div className="sidebar-topics-scrollbar mt-6 flex-1 overflow-y-auto pr-1">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">
          Chapters
        </h2>

        <div className="space-y-3">
          {filteredTopics.map((topic, index) => {
            const active = activeTopic?.id === topic.id;

            return (
              <div
                key={topic.id}
                className={`group rounded-2xl border-2 p-3 transition-colors duration-200 ${
                  active
                    ? "border-white/40 bg-white text-slate-900 shadow-xl"
                    : "border-white/10 bg-white/10 hover:bg-white/20"
                }`}
              >
                <div className="flex items-start gap-2">
                  <button
                    onClick={() => setActiveTopic(topic)}
                    className="flex min-w-0 flex-1 gap-3 text-left"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                        active
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold capitalize">
                        {topic.title}
                      </h3>

                      <div
                        className={`mt-2 flex items-center gap-1 text-xs ${
                          active ? "text-slate-500" : "text-white/70"
                        }`}
                      >
                        <span className="capitalize">
                          {topic.level} · {topic.language}
                        </span>
                      </div>
                    </div>
                  </button>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => onEditTopic(topic)}
                      title={`Edit ${topic.title}`}
                      aria-label={`Edit ${topic.title}`}
                      className={`rounded-lg p-2 transition ${
                        active
                          ? "text-slate-500 hover:bg-indigo-100 hover:text-indigo-700"
                          : "text-white/70 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteTopic(topic)}
                      title={`Delete ${topic.title}`}
                      aria-label={`Delete ${topic.title}`}
                      className={`rounded-lg p-2 transition ${
                        active
                          ? "text-slate-500 hover:bg-red-100 hover:text-red-600"
                          : "text-white/70 hover:bg-red-500/30 hover:text-white"
                      }`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 text-center text-sm text-white/70">
              Loading topics...
            </div>
          )}

          {!isLoading && filteredTopics.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/30 p-6 text-center text-sm text-white/70">
              No topics found.
            </div>
          )}
        </div>
      </div>

      {/* Add Topic */}
      <button
        onClick={onAddTopic}
        className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-white py-3 font-semibold text-indigo-600 shadow-xl transition-colors duration-200 hover:bg-indigo-50"
      >
        <Plus size={18} />
        Add Topic
      </button>
    </aside>
  );
}
