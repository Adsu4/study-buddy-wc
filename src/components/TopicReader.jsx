import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  GraduationCap,
  Zap,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import DiagramViewer from './Diagrams';
import HighlightToolbar from './HighlightToolbar';
import { formatRichContent } from '../utils/mathRenderer';

// Meaningful interactive widgets
import ClusterReuseSim from './interactive/ClusterReuseSim';
import ErlangCalculator from './interactive/ErlangCalculator';
import PathLossComparator from './interactive/PathLossComparator';
import GsmCallFlowSim from './interactive/GsmCallFlowSim';
import AccessMatrix from './interactive/AccessMatrix';

export default function TopicReader({
  topic,
  module,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  isMastered,
  onToggleMastered,
  onAddHighlight,
  isFocusMode,
  onToggleFocusMode,
  allHighlights = []
}) {
  const [activeTab, setActiveTab] = useState('textbook'); // 'textbook', 'teaching', 'revision'
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Filter highlights specifically for this topic
  const topicHighlights = allHighlights.filter((h) => h.topicId === topic?.id);

  // Stop speech synthesis when topic or tab changes
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [topic?.id, activeTab]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    function handleKeyDown(e) {
      // If user is typing in an input, don't trigger navigation
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight' && hasNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasNext, hasPrev, onNext, onPrev]);

  if (!topic) {
    return (
      <div className="empty-reader-state">
        <BookOpen size={48} className="text-muted" />
        <h3>Select a topic from the syllabus navigation to begin studying</h3>
      </div>
    );
  }

  // Audio speech synthesis helper
  function toggleSpeech() {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown symbols for cleaner speech
    const cleanText = topic.teachingSummary
      .replace(/###/g, '')
      .replace(/##/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/\$/g, '')
      .replace(/\\/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }

  function renderInteractiveWidget() {
    if (topic.id === 'm2-cellular-geometry-reuse' || topic.id === 'm2-interference-si-ratio') {
      return <ClusterReuseSim />;
    }
    if (topic.id === 'm2-trunking-gos') {
      return <ErlangCalculator />;
    }
    if (topic.id === 'm3-propagation-mechanisms-free-space') {
      return <PathLossComparator />;
    }
    if (topic.id === 'm4-multiple-access-comparison') {
      return <AccessMatrix />;
    }
    if (topic.id === 'm4-gsm-architecture-protocols') {
      return <GsmCallFlowSim />;
    }
    return null;
  }

  return (
    <article className="topic-reader-container">
      {/* Floating Selection Tooltip for Highlighting */}
      <HighlightToolbar onAddHighlight={onAddHighlight} />

      {/* Reader Top Action Bar */}
      <header className="reader-header-bar">
        <div className="reader-breadcrumbs">
          <span className="crumb-module">Module {module.number}: {module.title}</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-topic">{topic.title}</span>
        </div>

        <div className="reader-header-actions">
          {/* Spoken Lecture Button (Available in Teaching mode) */}
          {activeTab === 'teaching' && (
            <button
              className={`btn-mastery ${isSpeaking ? 'active-speaking' : ''}`}
              onClick={toggleSpeech}
              title={isSpeaking ? "Pause Spoken Explanation" : "Listen to Classroom Explanation"}
            >
              {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
              <span>{isSpeaking ? "Stop Voice" : "Listen (TTS)"}</span>
            </button>
          )}

          <button
            className={`btn-mastery ${isMastered ? 'mastered' : ''}`}
            onClick={onToggleMastered}
            title={isMastered ? "Mark as unread" : "Mark as Mastered"}
          >
            <CheckCircle2 size={15} />
            <span>{isMastered ? "Topic Mastered" : "Mark as Mastered"}</span>
          </button>

          <button
            className="btn-icon-focus"
            onClick={onToggleFocusMode}
            title={isFocusMode ? "Exit Focus Mode" : "Distraction-Free Focus Mode"}
          >
            {isFocusMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </header>

      {/* Topic Title & References Header */}
      <div className="topic-hero-block">
        <h1 className="topic-main-title">{topic.title}</h1>

        <div className="topic-meta-row">
          <div className="syllabus-badge">
            <strong>Syllabus Focus:</strong> {topic.syllabusRef}
          </div>
          <div className="standard-ref-badge">
            <strong>Standard Textbook Ref:</strong> {topic.standardRef}
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <nav className="learning-style-tabs">
        <button
          className={`style-tab-btn ${activeTab === 'textbook' ? 'active' : ''}`}
          onClick={() => setActiveTab('textbook')}
        >
          <BookOpen size={16} />
          <div className="btn-tab-text">
            <span className="tab-title">Textbook Explanation</span>
            <span className="tab-desc">Structured, clear & standard equations</span>
          </div>
        </button>

        <button
          className={`style-tab-btn ${activeTab === 'teaching' ? 'active' : ''}`}
          onClick={() => setActiveTab('teaching')}
        >
          <GraduationCap size={16} />
          <div className="btn-tab-text">
            <span className="tab-title">Classroom Lecture Summary</span>
            <span className="tab-desc">Intuitive analogies & prof's exam tips</span>
          </div>
        </button>

        <button
          className={`style-tab-btn ${activeTab === 'revision' ? 'active' : ''}`}
          onClick={() => setActiveTab('revision')}
        >
          <Zap size={16} />
          <div className="btn-tab-text">
            <span className="tab-title">High-Yield Revision</span>
            <span className="tab-desc">Key takeaways & formula cards</span>
          </div>
        </button>
      </nav>

      {/* Distraction-Free Article Body with KaTeX & Inline Highlights */}
      <div id="distraction-free-reader-body" className="reader-article-body">
        {activeTab === 'textbook' && (
          <div className="textbook-content-section">
            <div
              className="markdown-prose"
              dangerouslySetInnerHTML={{
                __html: formatRichContent(topic.textbookExplanation, topicHighlights)
              }}
            />
          </div>
        )}

        {activeTab === 'teaching' && (
          <div className="teaching-content-section">
            <div className="teaching-banner-note">
              <GraduationCap className="teaching-banner-icon" size={20} />
              <div>
                <strong>Classroom Mode:</strong> Relaxed, intuitive explanation with physical mental models and exam tricks. Click <strong>Listen (TTS)</strong> in the top right to hear this read aloud!
              </div>
            </div>
            <div
              className="markdown-prose"
              dangerouslySetInnerHTML={{
                __html: formatRichContent(topic.teachingSummary, topicHighlights)
              }}
            />
          </div>
        )}

        {activeTab === 'revision' && (
          <div className="revision-content-section">
            <h3 className="revision-heading">High-Yield Revision Points for Exam Recall</h3>
            <div className="revision-cards-list">
              {topic.quickRevision.map((point, idx) => (
                <div key={idx} className="revision-point-card">
                  <span className="revision-point-num">{idx + 1}</span>
                  <div
                    className="revision-point-text"
                    dangerouslySetInnerHTML={{
                      __html: formatRichContent(point, topicHighlights)
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Embedded Technical Diagram */}
        {topic.diagram && (
          <div className="embedded-diagram-wrapper">
            <DiagramViewer diagramType={topic.diagram} />
          </div>
        )}

        {/* Sourced Technical Images & Diagrams */}
        {topic.images && topic.images.length > 0 && (
          <div className="topic-images-gallery">
            <h3 className="images-gallery-heading">
              <Sparkles size={18} />
              Technical Diagrams & Reference Figures
            </h3>
            <div className="images-gallery-grid">
              {topic.images.map((img, idx) => (
                <figure key={idx} className="topic-image-figure">
                  <div className="topic-image-wrapper">
                    <img
                      src={img.src}
                      alt={img.alt || `Diagram ${idx + 1}`}
                      className="topic-image-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling && (e.target.nextSibling.style.display = 'flex');
                      }}
                    />
                    <div className="topic-image-fallback" style={{ display: 'none' }}>
                      <ExternalLink size={24} />
                      <span>Image unavailable — <a href={img.src} target="_blank" rel="noopener noreferrer">Open source</a></span>
                    </div>
                  </div>
                  <figcaption className="topic-image-caption">
                    <strong>Fig {idx + 1}:</strong> {img.caption || img.alt}
                    {img.source && (
                      <span className="image-source-tag">Source: {img.source}</span>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {/* Meaningful Interactive Widget */}
        {renderInteractiveWidget()}
      </div>

      {/* Footer Navigation Bar */}
      <footer className="reader-footer-nav">
        <button
          className="btn-nav-prev"
          onClick={onPrev}
          disabled={!hasPrev}
          title="Previous Topic (Shortcut: Left Arrow)"
        >
          <ChevronLeft size={16} />
          <span>Previous Topic</span>
        </button>

        <div className="footer-status-indicator">
          <span>Topic {isMastered ? "✅ Mastered" : "📖 In Progress"}</span>
          <span style={{ marginLeft: '0.5rem', opacity: 0.7 }}>• Use ← / → keys to flip topics</span>
        </div>

        <button
          className="btn-nav-next"
          onClick={onNext}
          disabled={!hasNext}
          title="Next Topic (Shortcut: Right Arrow)"
        >
          <span>Next Topic</span>
          <ChevronRight size={16} />
        </button>
      </footer>
    </article>
  );
}
