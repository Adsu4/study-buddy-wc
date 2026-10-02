import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Video, BookMarked, Search, BookOpen, Layers } from 'lucide-react';
import { MODULES_DATA, COURSE_INFO } from '../data/syllabusData';

export default function Sidebar({
  selectedModuleId,
  selectedTopicId,
  onSelectTopic,
  masteredTopics,
  searchQuery,
  onOpenSyllabusModal
}) {
  const [expandedModules, setExpandedModules] = useState({
    "mod-1": true,
    "mod-2": true,
    "mod-3": true,
    "mod-4": true
  });

  function toggleModule(modId) {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  }

  // Filter modules/topics if search query is active
  const filteredModules = MODULES_DATA.map((mod) => {
    if (!searchQuery) return mod;
    const matchingTopics = mod.topics.filter(
      (t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.syllabusRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.textbookExplanation.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...mod,
      topics: matchingTopics,
      isMatch: matchingTopics.length > 0 || mod.title.toLowerCase().includes(searchQuery.toLowerCase())
    };
  }).filter((mod) => !searchQuery || mod.isMatch);

  const totalTopicsCount = MODULES_DATA.reduce((acc, m) => acc + m.topics.length, 0);
  const masteredCount = Object.keys(masteredTopics).filter((k) => masteredTopics[k]).length;
  const progressPct = Math.round((masteredCount / totalTopicsCount) * 100);

  return (
    <aside className="app-sidebar-container">
      {/* Progress & Overview Card */}
      <div className="sidebar-progress-card">
        <div className="progress-label-row">
          <span className="progress-label-text">Syllabus Completion</span>
          <span className="progress-percent-val">{progressPct}%</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="progress-footer-meta">
          <span>{masteredCount} of {totalTopicsCount} topics mastered</span>
          <button className="btn-syllabus-info" onClick={onOpenSyllabusModal} title="View Textbook References & Scheme">
            <BookMarked size={13} /> S5 Scheme
          </button>
        </div>
      </div>

      {/* Modules Tree Navigation */}
      <div className="sidebar-modules-tree">
        {filteredModules.map((mod) => {
          const isExpanded = expandedModules[mod.id] || searchQuery.length > 0;
          const isCurrentModule = mod.id === selectedModuleId;
          const modMasteredCount = mod.topics.filter((t) => masteredTopics[t.id]).length;

          return (
            <div key={mod.id} className={`module-accordion-group ${isCurrentModule ? 'current' : ''}`}>
              <div
                className="module-header-btn"
                onClick={() => toggleModule(mod.id)}
              >
                <div className="module-title-wrap">
                  {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                  <span className="module-number-tag">M{mod.number}</span>
                  <span className="module-title-text">{mod.title}</span>
                </div>
                <span className="module-progress-chip">
                  {modMasteredCount}/{mod.topics.length}
                </span>
              </div>

              {isExpanded && (
                <div className="module-topics-list">
                  {/* NPTEL Video Link for this module */}
                  <div className="module-nptel-strip">
                    <a
                      href={mod.nptel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nptel-link"
                    >
                      <Video size={12} />
                      <span>Watch NPTEL Video Lectures</span>
                    </a>
                  </div>

                  {mod.topics.map((t) => {
                    const isSelected = t.id === selectedTopicId;
                    const isTopicMastered = !!masteredTopics[t.id];

                    return (
                      <div
                        key={t.id}
                        className={`topic-nav-item ${isSelected ? 'active' : ''} ${isTopicMastered ? 'completed' : ''}`}
                        onClick={() => onSelectTopic(mod.id, t.id)}
                      >
                        <span className="topic-status-icon">
                          {isTopicMastered ? (
                            <CheckCircle2 size={14} className="icon-mastered" />
                          ) : (
                            <Circle size={14} className="icon-pending" />
                          )}
                        </span>
                        <div className="topic-text-col">
                          <span className="topic-nav-title">{t.title}</span>
                          <span className="topic-nav-ref">{t.standardRef}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
