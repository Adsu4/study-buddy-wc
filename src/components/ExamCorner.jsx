import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Eye,
  EyeOff,
  Sparkles,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
  FileSpreadsheet,
  Calculator
} from 'lucide-react';
import { EXAM_CORNER_DATA, COURSE_INFO } from '../data/syllabusData';
import { formatRichContent } from '../utils/mathRenderer';

export default function ExamCorner() {
  const [selectedModuleId, setSelectedModuleId] = useState("mod-2");
  const [examSubTab, setExamSubTab] = useState("standard"); // 'standard', 'flashcards', 'formulas'
  const [expandedAnswers, setExpandedAnswers] = useState({});
  const [hideAllAnswers, setHideAllAnswers] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardStats, setCardStats] = useState({ known: 0, review: 0 });

  const currentExamData = EXAM_CORNER_DATA.find((m) => m.moduleId === selectedModuleId) || EXAM_CORNER_DATA[0];
  const allPartAQuestions = currentExamData.partAQuestions;
  const currentCard = allPartAQuestions[flashcardIndex] || allPartAQuestions[0];

  function toggleAnswer(id) {
    setExpandedAnswers((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  }

  function handleCopyAnswer(id, text) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  function handleCardScore(known) {
    setCardStats((prev) => ({
      ...prev,
      known: known ? prev.known + 1 : prev.known,
      review: !known ? prev.review + 1 : prev.review
    }));
    setIsFlipped(false);
    if (flashcardIndex < allPartAQuestions.length - 1) {
      setFlashcardIndex(flashcardIndex + 1);
    } else {
      setFlashcardIndex(0);
    }
  }

  const formulaSheet = [
    {
      category: "Module 2: Cellular Design",
      items: [
        { name: "Hexagonal Cluster Size", formula: "$$N = i^2 + ij + j^2$$", note: "Permissible N = 1, 3, 4, 7, 9, 12, 19..." },
        { name: "Co-Channel Reuse Ratio", formula: "$$Q = \\frac{D}{R} = \\sqrt{3N}$$", note: "D = Co-channel distance, R = Cell radius" },
        { name: "Worst-Case S/I (Omni)", formula: "$$\\frac{S}{I} = \\frac{(\\sqrt{3N})^n}{6}$$", note: "n = Path loss exponent, 6 first-tier interferers" },
        { name: "Worst-Case S/I (120° Sector)", formula: "$$\\frac{S}{I} = \\frac{(\\sqrt{3N})^n}{2}$$", note: "Interferers drop from 6 to 2 (4.77 dB gain)" },
        { name: "Traffic Intensity (Offered)", formula: "$$A = U \\cdot \\lambda \\cdot H$$", note: "In Erlangs. 1 Erlang = 1 channel 100% busy for 1 hr" },
        { name: "Erlang B (GoS)", formula: "$$P_b = \\frac{A^C / C!}{\\sum_{k=0}^C A^k / k!}$$", note: "Blocked Calls Cleared (BCC) probability" }
      ]
    },
    {
      category: "Module 3: Propagation & Diversity",
      items: [
        { name: "Friis Free Space Path Loss", formula: "$$P_r(d) = \\frac{P_t G_t G_r \\lambda^2}{(4\\pi)^2 d^2 L}$$", note: "Loss increases at 20 dB/decade (1/d²)" },
        { name: "2-Ray Ground Power", formula: "$$P_r \\approx P_t G_t G_r \\frac{h_t^2 h_r^2}{d^4}$$", note: "Loss steepens to 40 dB/decade (1/d⁴)" },
        { name: "Cross-Over Distance", formula: "$$d_c = \\frac{4\\pi h_t h_r}{\\lambda}$$", note: "Transition distance between 1/d² and 1/d⁴" },
        { name: "Coherence Bandwidth", formula: "$$B_c \\approx \\frac{1}{5\\sigma_\\tau}$$", note: "For 0.5 correlation (1 / (50*sigma_tau) for 0.9)" },
        { name: "Doppler Shift & Coherence Time", formula: "$$f_d = \\frac{v}{\\lambda}\\cos\\theta, \\quad T_c \\approx \\frac{0.423}{f_m}$$", note: "fm = max Doppler shift (v/lambda)" },
        { name: "Fresnel-Kirchhoff Parameter", formula: "$$\\nu = h\\sqrt{\\frac{2(d_1 + d_2)}{\\lambda d_1 d_2}}$$", note: "Knife-edge diffraction geometry" }
      ]
    }
  ];

  return (
    <div className="exam-corner-container">
      {/* Exam Header Banner with Gemini Touch */}
      <div className="exam-hero-banner">
        <div className="exam-hero-text">
          <div className="exam-tag-pill">
            <Award size={14} /> University Exam Preparation (PCCPT502)
          </div>
          <h2 className="exam-hero-title">S5 End Semester Exam (ESE) & CIE Mastery Corner</h2>
          <p className="exam-hero-desc">
            Standard University Scheme: <strong>Part A (8 × 3 = 24 Marks)</strong> definitions & conceptual questions, and <strong>Part B (4 × 9 = 36 Marks)</strong> deep derivations, architectures, and numerical problems.
          </p>
        </div>

        <div className="exam-stats-pills">
          <div className="exam-stat-chip">
            <span className="stat-num">40</span>
            <span className="stat-lbl">CIE Marks</span>
          </div>
          <div className="exam-stat-chip">
            <span className="stat-num">60</span>
            <span className="stat-lbl">ESE Marks</span>
          </div>
          <div className="exam-stat-chip">
            <span className="stat-num">2.5h</span>
            <span className="stat-lbl">Duration</span>
          </div>
        </div>
      </div>

      {/* Sub-mode Navigation: Questions vs Flashcards vs Formula Sheet */}
      <div className="tab-pills-row" style={{ marginBottom: 0 }}>
        <button
          className={`tab-pill ${examSubTab === 'standard' ? 'active' : ''}`}
          onClick={() => setExamSubTab('standard')}
        >
          <BookOpen size={14} /> 3M & 9M Question Bank
        </button>
        <button
          className={`tab-pill ${examSubTab === 'flashcards' ? 'active' : ''}`}
          onClick={() => { setExamSubTab('flashcards'); setIsFlipped(false); }}
        >
          <Sparkles size={14} /> 3-Mark Active Recall Flashcards
        </button>
        <button
          className={`tab-pill ${examSubTab === 'formulas' ? 'active' : ''}`}
          onClick={() => setExamSubTab('formulas')}
        >
          <Calculator size={14} /> Exam Formula Cheat Sheet
        </button>
      </div>

      {/* MODULE SELECTOR TABS (Shown for Question Bank & Flashcards) */}
      {examSubTab !== 'formulas' && (
        <div className="exam-module-tabs">
          {EXAM_CORNER_DATA.map((mod) => (
            <button
              key={mod.moduleId}
              className={`exam-mod-tab ${selectedModuleId === mod.moduleId ? 'active' : ''}`}
              onClick={() => { setSelectedModuleId(mod.moduleId); setFlashcardIndex(0); setIsFlipped(false); }}
            >
              Module {mod.moduleNumber}
            </button>
          ))}

          {examSubTab === 'standard' && (
            <div className="practice-toggle-wrapper">
              <button
                className={`btn-practice-mode ${hideAllAnswers ? 'active' : ''}`}
                onClick={() => setHideAllAnswers(!hideAllAnswers)}
              >
                {hideAllAnswers ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{hideAllAnswers ? "Self-Test (Answers Hidden)" : "Study (Answers Visible)"}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW 1: STANDARD QUESTION BANK */}
      {examSubTab === 'standard' && (
        <div className="exam-questions-content">
          {/* PART A: 3-Mark Questions */}
          <div className="exam-section-block">
            <div className="section-title-bar">
              <div className="section-title-left">
                <span className="part-badge part-a">Part A</span>
                <h3 className="section-heading">Short Answer & Definitions (3 Marks Each)</h3>
              </div>
              <span className="section-hint">2 Questions per Module • Strict 3-Mark Scoring Rubric</span>
            </div>

            <div className="questions-list">
              {currentExamData.partAQuestions.map((q, idx) => {
                const qId = `partA-${selectedModuleId}-${idx}`;
                const isExpanded = hideAllAnswers ? !!expandedAnswers[qId] : expandedAnswers[qId] !== false;

                return (
                  <div key={qId} className="question-card">
                    <div className="question-header" onClick={() => toggleAnswer(qId)}>
                      <div className="q-number-box">Q{idx + 1}</div>
                      <div className="q-title-box">
                        <div
                          className="q-text"
                          dangerouslySetInnerHTML={{ __html: formatRichContent(q.q) }}
                        />
                        <div className="q-meta">
                          <span className="marks-badge">{q.marks} Marks</span>
                          <span className="co-badge">{q.co}</span>
                          <span className="kl-badge">Bloom: K2</span>
                        </div>
                      </div>
                      <button className="q-toggle-btn">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="answer-box">
                        <div className="answer-header">
                          <span className="model-ans-label"><CheckCircle size={13} /> Model Scoring Answer:</span>
                          <button
                            className="copy-ans-btn"
                            onClick={() => handleCopyAnswer(qId, q.answer)}
                          >
                            {copiedId === qId ? <Check size={12} className="text-success" /> : <Copy size={12} />}
                            <span>{copiedId === qId ? "Copied" : "Copy"}</span>
                          </button>
                        </div>
                        <div
                          className="answer-markdown-content"
                          dangerouslySetInnerHTML={{ __html: formatRichContent(q.answer) }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* PART B: 9-Mark Questions */}
          <div className="exam-section-block">
            <div className="section-title-bar">
              <div className="section-title-left">
                <span className="part-badge part-b">Part B</span>
                <h3 className="section-heading">Analytical Derivations, Architectures & Numericals (9 Marks Each)</h3>
              </div>
              <span className="section-hint">Answer 1 out of 2 Full Questions in Final Exam • Sub-divisions (a, b, c)</span>
            </div>

            <div className="questions-list">
              {currentExamData.partBQuestions.map((q, idx) => {
                const qId = `partB-${selectedModuleId}-${idx}`;
                const isExpanded = hideAllAnswers ? !!expandedAnswers[qId] : expandedAnswers[qId] !== false;

                return (
                  <div key={qId} className="question-card part-b-card">
                    <div className="question-header" onClick={() => toggleAnswer(qId)}>
                      <div className="q-number-box part-b-num">Q{idx + 1}</div>
                      <div className="q-title-box">
                        <div
                          className="q-text"
                          dangerouslySetInnerHTML={{ __html: formatRichContent(q.q) }}
                        />
                        <div className="q-meta">
                          <span className="marks-badge part-b-marks">{q.marks} Marks</span>
                          <span className="co-badge">{q.co}</span>
                          <span className="kl-badge">Bloom: K2 / K3</span>
                        </div>
                      </div>
                      <button className="q-toggle-btn">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="answer-box">
                        <div className="answer-header">
                          <span className="model-ans-label"><CheckCircle size={13} /> Detailed Step-by-Step Scoring Guide:</span>
                          <button
                            className="copy-ans-btn"
                            onClick={() => handleCopyAnswer(qId, q.answer)}
                          >
                            {copiedId === qId ? <Check size={12} className="text-success" /> : <Copy size={12} />}
                            <span>{copiedId === qId ? "Copied" : "Copy"}</span>
                          </button>
                        </div>
                        <div
                          className="answer-markdown-content"
                          dangerouslySetInnerHTML={{ __html: formatRichContent(q.answer) }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: FLASHCARDS ACTIVE RECALL */}
      {examSubTab === 'flashcards' && (
        <div className="flashcards-wrapper">
          <div className="flashcard-scoreboard">
            <div className="score-badge known">Known: {cardStats.known}</div>
            <div className="score-badge review">Needs Review: {cardStats.review}</div>
            <div className="card-counter">Card {flashcardIndex + 1} of {allPartAQuestions.length}</div>
          </div>

          <div
            className={`active-flashcard-box ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <span className="flashcard-mode-tag">Question (Part A • 3 Marks)</span>
                <h3
                  className="flashcard-question-text"
                  dangerouslySetInnerHTML={{ __html: formatRichContent(currentCard.q) }}
                />
                <div className="click-to-flip-hint">
                  <RotateCw size={14} /> Click card to flip and reveal answer
                </div>
              </div>

              <div className="flashcard-back">
                <span className="flashcard-mode-tag answer-tag">Model Scoring Answer</span>
                <div
                  className="flashcard-answer-scroll"
                  dangerouslySetInnerHTML={{ __html: formatRichContent(currentCard.answer) }}
                />
                <div className="click-to-flip-hint">Click card to view question</div>
              </div>
            </div>
          </div>

          {/* Grading buttons */}
          <div className="flashcard-actions">
            <button className="btn-grade review" onClick={() => handleCardScore(false)}>
              <ThumbsDown size={16} /> Needs Practice
            </button>
            <button className="btn-grade known" onClick={() => handleCardScore(true)}>
              <ThumbsUp size={16} /> I Knew This!
            </button>
          </div>
        </div>
      )}

      {/* VIEW 3: FORMULA CHEAT SHEET */}
      {examSubTab === 'formulas' && (
        <div className="formula-cheatsheet-wrapper">
          {formulaSheet.map((section, idx) => (
            <div key={idx} className="formula-cat-block">
              <h3 className="formula-cat-title">{section.category}</h3>
              <div className="formula-cards-grid">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="formula-item-card">
                    <div className="formula-item-header">
                      <span className="formula-item-name">{item.name}</span>
                    </div>
                    <div
                      className="formula-math-display"
                      dangerouslySetInnerHTML={{ __html: formatRichContent(item.formula) }}
                    />
                    <div className="formula-item-note">{item.note}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
