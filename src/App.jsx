import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TopicReader from './components/TopicReader';
import ExamCorner from './components/ExamCorner';
import HighlightDrawer from './components/HighlightDrawer';
import SyllabusModal from './components/SyllabusModal';
import { MODULES_DATA } from './data/syllabusData';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('study_buddy_dark_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Focus mode (distraction free)
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Active view: 'notes' | 'exam'
  const [activeView, setActiveView] = useState('notes');

  // Active Module & Topic selection
  const [selectedModuleId, setSelectedModuleId] = useState('mod-2');
  const [selectedTopicId, setSelectedTopicId] = useState('m2-cellular-geometry-reuse');

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [isHighlightDrawerOpen, setIsHighlightDrawerOpen] = useState(false);
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);

  // User Highlights State (persisted in localStorage)
  const [highlights, setHighlights] = useState(() => {
    try {
      const saved = localStorage.getItem('study_buddy_highlights_wc');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Mastered Topics State (persisted in localStorage)
  const [masteredTopics, setMasteredTopics] = useState(() => {
    try {
      const saved = localStorage.getItem('study_buddy_mastered_wc');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Apply dark mode class to html document
  useEffect(() => {
    localStorage.setItem('study_buddy_dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist highlights
  useEffect(() => {
    localStorage.setItem('study_buddy_highlights_wc', JSON.stringify(highlights));
  }, [highlights]);

  // Persist mastered topics
  useEffect(() => {
    localStorage.setItem('study_buddy_mastered_wc', JSON.stringify(masteredTopics));
  }, [masteredTopics]);

  // Find current active module & topic
  const currentModule = MODULES_DATA.find((m) => m.id === selectedModuleId) || MODULES_DATA[0];
  const currentTopic = currentModule.topics.find((t) => t.id === selectedTopicId) || currentModule.topics[0];

  // Flattened topic list for sequential next/prev navigation
  const allTopicsFlattened = [];
  MODULES_DATA.forEach((m) => {
    m.topics.forEach((t) => {
      allTopicsFlattened.push({ moduleId: m.id, module: m, topic: t });
    });
  });

  const currentIndex = allTopicsFlattened.findIndex(
    (item) => item.moduleId === selectedModuleId && item.topic.id === selectedTopicId
  );
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allTopicsFlattened.length - 1;

  function handlePrev() {
    if (hasPrev) {
      const prev = allTopicsFlattened[currentIndex - 1];
      setSelectedModuleId(prev.moduleId);
      setSelectedTopicId(prev.topic.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleNext() {
    if (hasNext) {
      const next = allTopicsFlattened[currentIndex + 1];
      setSelectedModuleId(next.moduleId);
      setSelectedTopicId(next.topic.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleSelectTopic(modId, topId) {
    setSelectedModuleId(modId);
    setSelectedTopicId(topId);
    if (activeView !== 'notes') {
      setActiveView('notes');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleToggleMastered() {
    setMasteredTopics((prev) => ({
      ...prev,
      [currentTopic.id]: !prev[currentTopic.id]
    }));
  }

  function handleAddHighlight(newHighlight) {
    const record = {
      id: Date.now().toString(),
      moduleId: currentModule.id,
      topicId: currentTopic.id,
      topicTitle: currentTopic.title,
      text: newHighlight.text,
      color: newHighlight.color || 'yellow',
      note: newHighlight.note || '',
      timestamp: Date.now()
    };
    setHighlights((prev) => [record, ...prev]);
  }

  function handleDeleteHighlight(id) {
    setHighlights((prev) => prev.filter((h) => h.id !== id));
  }

  function handleClearAllHighlights() {
    setHighlights([]);
  }

  const masteredCount = Object.keys(masteredTopics).filter((k) => masteredTopics[k]).length;
  const totalTopics = allTopicsFlattened.length;

  return (
    <div className={`app-root ${darkMode ? 'dark-theme' : 'light-theme'} ${isFocusMode ? 'focus-mode-active' : ''}`}>
      {/* Top App Header */}
      {!isFocusMode && (
        <Header
          activeView={activeView}
          setActiveView={setActiveView}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          highlightsCount={highlights.length}
          onOpenHighlights={() => setIsHighlightDrawerOpen(true)}
          isFocusMode={isFocusMode}
          setIsFocusMode={setIsFocusMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          masteredCount={masteredCount}
          totalTopics={totalTopics}
        />
      )}

      {/* Floating Focus Mode Exit Button when in focus mode */}
      {isFocusMode && (
        <button
          className="floating-exit-focus-btn"
          onClick={() => setIsFocusMode(false)}
          title="Exit Focus Mode (Show Navigation)"
        >
          Exit Focus Mode ✕
        </button>
      )}

      {/* Main Workspace Layout */}
      <div className="app-workspace-body">
        {/* Collapsible / Toggleable Sidebar */}
        {!isFocusMode && activeView === 'notes' && (
          <Sidebar
            selectedModuleId={selectedModuleId}
            selectedTopicId={selectedTopicId}
            onSelectTopic={handleSelectTopic}
            masteredTopics={masteredTopics}
            searchQuery={searchQuery}
            onOpenSyllabusModal={() => setIsSyllabusModalOpen(true)}
          />
        )}

        {/* Content Viewer Area */}
        <main className={`main-content-viewport ${isFocusMode ? 'focus-expanded' : ''}`}>
          {activeView === 'notes' ? (
            <TopicReader
              topic={currentTopic}
              module={currentModule}
              onPrev={handlePrev}
              onNext={handleNext}
              hasPrev={hasPrev}
              hasNext={hasNext}
              isMastered={!!masteredTopics[currentTopic.id]}
              onToggleMastered={handleToggleMastered}
              onAddHighlight={handleAddHighlight}
              isFocusMode={isFocusMode}
              onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
              allHighlights={highlights}
            />
          ) : (
            <ExamCorner />
          )}
        </main>
      </div>

      {/* Saved Highlights & Notes Drawer */}
      <HighlightDrawer
        isOpen={isHighlightDrawerOpen}
        onClose={() => setIsHighlightDrawerOpen(false)}
        highlights={highlights}
        onDeleteHighlight={handleDeleteHighlight}
        onClearAllHighlights={handleClearAllHighlights}
        onSelectTopic={handleSelectTopic}
      />

      {/* Syllabus Scheme & Textbooks Modal */}
      <SyllabusModal
        isOpen={isSyllabusModalOpen}
        onClose={() => setIsSyllabusModalOpen(false)}
      />
    </div>
  );
}
