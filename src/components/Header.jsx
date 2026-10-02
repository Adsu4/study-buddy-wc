import React from 'react';
import { Radio, Moon, Sun, Highlighter, Award, BookOpen, Search, Maximize2, Minimize2, CheckCircle2 } from 'lucide-react';

export default function Header({
  activeView,
  setActiveView,
  darkMode,
  setDarkMode,
  highlightsCount,
  onOpenHighlights,
  isFocusMode,
  setIsFocusMode,
  searchQuery,
  setSearchQuery,
  masteredCount,
  totalTopics
}) {
  const progressPercent = Math.round((masteredCount / totalTopics) * 100);

  return (
    <header className="app-main-header">
      <div className="header-left">
        <div className="brand-logo-group" onClick={() => setActiveView('notes')}>
          <div className="brand-icon-box">
            <Radio size={20} className="brand-icon" />
          </div>
          <div className="brand-titles">
            <h2 className="brand-name">StudyBuddy <span className="subject-pill">Wireless Comm</span></h2>
            <span className="brand-subtitle">Semester S5 • PCCPT502 • 4 Credits</span>
          </div>
        </div>
      </div>

      {/* Middle: Navigation Mode Switcher */}
      <div className="header-center">
        <div className="nav-segmented-control">
          <button
            className={`nav-seg-btn ${activeView === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveView('notes')}
          >
            <BookOpen size={15} />
            <span>Syllabus Notes</span>
          </button>

          <button
            className={`nav-seg-btn ${activeView === 'exam' ? 'active' : ''}`}
            onClick={() => setActiveView('exam')}
          >
            <Award size={15} />
            <span>Exam Corner (3M/9M)</span>
          </button>
        </div>
      </div>

      {/* Right: Actions, Search, Highlights, Focus, Dark/Light Theme */}
      <div className="header-right">
        {/* Quick Search */}
        <div className="header-search-bar">
          <Search size={14} className="search-icon" />
          <input
            type="text"
            placeholder="Search syllabus, formulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>

        {/* Highlights Drawer Button */}
        <button
          className="header-icon-btn highlight-btn"
          onClick={onOpenHighlights}
          title="My Highlights & Notes"
        >
          <Highlighter size={17} />
          {highlightsCount > 0 && (
            <span className="hl-counter-badge">{highlightsCount}</span>
          )}
        </button>

        {/* Focus Mode Toggle */}
        <button
          className={`header-icon-btn focus-toggle-btn ${isFocusMode ? 'active' : ''}`}
          onClick={() => setIsFocusMode(!isFocusMode)}
          title={isFocusMode ? "Exit Focus Mode" : "Enter Distraction-Free Focus Mode"}
        >
          {isFocusMode ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
        </button>

        {/* Dark / Light Toggle */}
        <button
          className="header-icon-btn theme-toggle-btn"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun size={17} className="sun-icon" /> : <Moon size={17} className="moon-icon" />}
        </button>
      </div>
    </header>
  );
}
