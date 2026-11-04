import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopicModal from "./components/TopicModal";
import LearningPage from "./components/LearningPage";
import topicsData from "./data/topics";

export default function App() {
  const [topics, setTopics] = useState(topicsData);
  const [activeTopic, setActiveTopic] = useState(topicsData[0]);
  const [openModal, setOpenModal] = useState(false);

  const handleCreateTopic = (newTopic) => {
    setTopics((prev) => [...prev, newTopic]);
    setActiveTopic(newTopic);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-slate-100">
      {/* Background Blur Effects */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-indigo-400/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[120px]" />
      <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-400/20 blur-[120px]" />

      <div className="relative flex h-full">
        {/* Sidebar */}
        <Sidebar
          topics={topics}
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
          onAddTopic={() => setOpenModal(true)}
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
      <TopicModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleCreateTopic}
      />
    </div>
  );
}