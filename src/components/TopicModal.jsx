import { useState } from "react";
import {
  X,
  BookOpen,
  GraduationCap,
  Languages,
  Plus,
  Pencil,
} from "lucide-react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

import { httpRequest } from "../lib/http-request";

const initialState = {
  topic: "",
  level: "",
  language: "",
};

export default function TopicModal({ topic, onClose, onCreate, onUpdate }) {
  const [form, setForm] = useState(
    topic
      ? {
          topic: topic.title,
          level: topic.level,
          language: topic.language,
        }
      : initialState,
  );
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!form.topic.trim()) err.topic = "Topic is required.";

    if (!form.level) err.level = "Please select a level.";

    if (!form.language) err.language = "Please select a language.";

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();

    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: form.topic.trim(),
        level: form.level,
        language: form.language,
      };
      const { data } = topic
        ? await httpRequest.put(`/topic/${topic.id}`, payload)
        : await httpRequest.post("/topic", payload);
      const createdTopic = data.data;

      const savedTopic = {
        id: createdTopic._id,
        title: createdTopic.name,
        level: createdTopic.level,
        language: createdTopic.language,
        duration: topic?.duration ?? "New topic",
        description: createdTopic.description ?? "",
        chapters: createdTopic.chapters ?? [],
      };

      if (topic) {
        onUpdate(savedTopic);
      } else {
        onCreate(savedTopic);
      }

      toast.success(
        data.message ||
          (topic
            ? "Topic updated successfully."
            : "Topic created successfully."),
      );
      onClose();
    } catch (error) {
      const message = isAxiosError(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "Failed to create topic.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-5">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-white shadow-xl">
        {/* Header */}

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/20 p-3">
                {topic ? <Pencil /> : <Plus />}
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {topic ? "Edit Topic" : "Create Topic"}
                </h2>

                <p className="text-white/80 text-sm">
                  {topic
                    ? "Update your learning topic."
                    : "Add a new learning chapter."}
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

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
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
              className={`w-full rounded-2xl border px-4 py-3 outline-none transition-colors
              ${
                errors.topic
                  ? "border-red-500"
                  : "border-slate-300 focus:border-indigo-500"
              }`}
            />

            {errors.topic && (
              <p className="mt-2 text-sm text-red-500">{errors.topic}</p>
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
              className={`w-full rounded-2xl border px-4 py-3 outline-none transition-colors
              ${
                errors.level
                  ? "border-red-500"
                  : "border-slate-300 focus:border-indigo-500"
              }`}
            >
              <option value="">Select level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {errors.level && (
              <p className="mt-2 text-sm text-red-500">{errors.level}</p>
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
              className={`w-full rounded-2xl border px-4 py-3 outline-none transition-colors
              ${
                errors.language
                  ? "border-red-500"
                  : "border-slate-300 focus:border-indigo-500"
              }`}
            >
              <option value="">Select language</option>
              <option value="english">English</option>
              <option value="hinglish">Hinglish</option>
            </select>

            {errors.language && (
              <p className="mt-2 text-sm text-red-500">{errors.language}</p>
            )}
          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-slate-300 py-3 font-semibold transition-colors hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 py-3 font-semibold text-white shadow-lg transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? topic
                  ? "Saving..."
                  : "Creating..."
                : topic
                  ? "Save Changes"
                  : "Create Topic"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
