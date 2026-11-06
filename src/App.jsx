import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import Sidebar from "./components/Sidebar";
import TopicModal from "./components/TopicModal";
import LearningPage from "./components/LearningPage";
import { httpRequest } from "./lib/http-request";
import { ToastContainer } from "react-toastify";

function toTopicViewModel(topic) {
  return {
    id: topic._id,
    title: topic.name,
    level: topic.level,
    language: topic.language,
    duration: "New topic",
    description: topic.description ?? "",
    chapters: topic.chapters,
  };
}

function getErrorMessage(error, fallback) {
  if (isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }

  return error instanceof Error ? error.message : fallback;
}

export default function App() {
  const [topics, setTopics] = useState([]);
  const [activeTopic, setActiveTopic] = useState(null);
  const [isLoadingTopics, setIsLoadingTopics] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchTopics() {
      try {
        const { data } = await httpRequest.get("/topic");
        const fetchedTopics = data.data.map(toTopicViewModel);

        if (isMounted) {
          setTopics(fetchedTopics);
          setActiveTopic(fetchedTopics[0] ?? null);
        }
      } catch (error) {
        if (isMounted) {
          toast.error(getErrorMessage(error, "Failed to fetch topics."));
        }
      } finally {
        if (isMounted) {
          setIsLoadingTopics(false);
        }
      }
    }

    fetchTopics();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreateTopic = (newTopic) => {
    setTopics((prev) => [...prev, newTopic]);
    setActiveTopic(newTopic);
  };

  const handleUpdateTopic = (updatedTopic) => {
    setTopics((prev) =>
      prev.map((topic) =>
        topic.id === updatedTopic.id ? updatedTopic : topic,
      ),
    );
    setActiveTopic((currentTopic) =>
      currentTopic?.id === updatedTopic.id ? updatedTopic : currentTopic,
    );
    setEditingTopic(null);
  };

  const handleDeleteTopic = async (topic) => {
    if (!window.confirm(`Delete "${topic.title}"?`)) return;

    try {
      const { data } = await httpRequest.delete(`/topic/${topic.id}`);
      const remainingTopics = topics.filter(
        (existingTopic) => existingTopic.id !== topic.id,
      );
      setTopics(remainingTopics);
      setActiveTopic((currentTopic) =>
        currentTopic?.id === topic.id
          ? (remainingTopics[0] ?? null)
          : currentTopic,
      );
      toast.success(data.message || "Topic deleted successfully.");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to delete topic."));
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-slate-100">
      <div className="relative flex h-full">
        {/* Sidebar */}
        <Sidebar
          topics={topics}
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
          onAddTopic={() => setOpenModal(true)}
          onEditTopic={setEditingTopic}
          onDeleteTopic={handleDeleteTopic}
          isLoading={isLoadingTopics}
        />

        {/* Learning Area */}
        <main className="flex-1 overflow-hidden">
          <LearningPage
            topic={activeTopic}
            topics={topics}
            setActiveTopic={setActiveTopic}
          />
        </main>
      </div>

      {/* Add Topic Modal */}
      {openModal && (
        <TopicModal
          onClose={() => setOpenModal(false)}
          onCreate={handleCreateTopic}
        />
      )}
      {editingTopic && (
        <TopicModal
          topic={editingTopic}
          onClose={() => setEditingTopic(null)}
          onUpdate={handleUpdateTopic}
        />
      )}
      <ToastContainer />
    </div>
  );
}
