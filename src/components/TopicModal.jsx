import { useEffect, useState } from "react";
import {
  X,
  BookOpen,
  GraduationCap,
  Languages,
  Plus,
} from "lucide-react";

const initialState = {
  topic: "",
  level: "",
  language: "",
};

export default function TopicModal({
  open,
  onClose,
  onCreate,
}) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) {
      setForm(initialState);
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    const err = {};

    if (!form.topic.trim())
      err.topic = "Topic is required.";

    if (!form.level)
      err.level = "Please select a level.";

    if (!form.language)
      err.language = "Please select a language.";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validate();

    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    const topic = {
      title: form.topic,
      level: form.level,
      language: form.language
    };

    console.log(topic);

    onCreate(topic);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-5">
      <div className="w-full max-w-lg rounded-3xl border border-white/20 bg-white shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 p-6 text-white">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/20 p-3">
                <Plus />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Create Topic
                </h2>

                <p className="text-white/80 text-sm">
                  Add a new learning chapter.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 hover:bg-white/20"
            >
              <X />
            </button>

          </div>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          {/* Topic */}

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <BookOpen size={18} />
              Topic
            </label>

            <input
              type="text"
              name="topic"
              value={form.topic}
              onChange={handleChange}
              placeholder="Example: Introduction to AI"
              className={`w-full rounded-2xl border px-4 py-3 outline-none transition
              ${
                errors.topic
                  ? "border-red-500"
                  : "border-slate-300 focus:border-indigo-500"
              }`}
            />

            {errors.topic && (
              <p className="mt-2 text-sm text-red-500">
                {errors.topic}
              </p>
            )}
          </div>

          {/* Level */}

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <GraduationCap size={18} />
              Level
            </label>

            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              className={`w-full rounded-2xl border px-4 py-3 outline-none transition
              ${
                errors.level
                  ? "border-red-500"
                  : "border-slate-300 focus:border-indigo-500"
              }`}
            >
              <option value="">Select level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            {errors.level && (
              <p className="mt-2 text-sm text-red-500">
                {errors.level}
              </p>
            )}
          </div>

          {/* Language */}

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Languages size={18} />
              Language
            </label>

            <select
              name="language"
              value={form.language}
              onChange={handleChange}
              className={`w-full rounded-2xl border px-4 py-3 outline-none transition
              ${
                errors.language
                  ? "border-red-500"
                  : "border-slate-300 focus:border-indigo-500"
              }`}
            >
              <option value="">Select language</option>
              <option>English</option>
              <option>Hindi</option>
              <option>Hinglish</option>
            </select>

            {errors.language && (
              <p className="mt-2 text-sm text-red-500">
                {errors.language}
              </p>
            )}
          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-slate-300 py-3 font-semibold transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Create Topic
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
