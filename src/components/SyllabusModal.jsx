import React from 'react';
import { X, BookCheck, ExternalLink, Award, FileSpreadsheet, Check } from 'lucide-react';
import { COURSE_INFO } from '../data/syllabusData';

export default function SyllabusModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <BookCheck className="text-accent" size={22} />
            <div>
              <h3 className="modal-title">{COURSE_INFO.courseName}</h3>
              <p className="modal-subtitle">Course Code: {COURSE_INFO.courseCode} • {COURSE_INFO.semester} • {COURSE_INFO.credits} Credits</p>
            </div>
          </div>
          <button className="icon-btn-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body-scroll">
          {/* Exam Mark Distribution */}
          <div className="modal-section-card">
            <h4 className="modal-sec-heading">Assessment Scheme (CIE: 40 Marks, ESE: 60 Marks)</h4>
            <div className="scheme-grid">
              <div className="scheme-box">
                <span className="scheme-label">Continuous Internal Evaluation (CIE)</span>
                <span className="scheme-value">40 Marks</span>
                <p className="scheme-desc">Attendance: 5M | Assignment/Microproject: 15M | Internal Exam 1: 10M | Internal Exam 2: 10M</p>
              </div>
              <div className="scheme-box">
                <span className="scheme-label">End Semester Examination (ESE)</span>
                <span className="scheme-value">60 Marks</span>
                <p className="scheme-desc">Part A: 8 questions × 3M = 24M (All compulsory) | Part B: 4 questions × 9M = 36M (1 out of 2 per module)</p>
              </div>
            </div>
          </div>

          {/* Standard Textbooks List */}
          <div className="modal-section-card">
            <h4 className="modal-sec-heading">Prescribed Standard Textbooks</h4>
            <div className="textbooks-list">
              {COURSE_INFO.textbooks.map((b, idx) => (
                <div key={idx} className="book-card-item">
                  <div className="book-num">{idx + 1}</div>
                  <div className="book-details">
                    <strong className="book-title">{b.title}</strong>
                    <span className="book-author">Author: {b.author}</span>
                    <span className="book-pub">Publisher: {b.publisher} ({b.edition})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reference Books */}
          <div className="modal-section-card">
            <h4 className="modal-sec-heading">Reference Books</h4>
            <div className="ref-books-grid">
              {COURSE_INFO.references.map((r, idx) => (
                <div key={idx} className="ref-book-item">
                  <span className="ref-book-title">{r.title}</span>
                  <span className="ref-book-meta">{r.author} • {r.publisher} ({r.edition})</span>
                </div>
              ))}
            </div>
          </div>

          {/* NPTEL Video Lectures */}
          <div className="modal-section-card">
            <h4 className="modal-sec-heading">Official Video Lectures (NPTEL / SWAYAM)</h4>
            <div className="nptel-links-list">
              {COURSE_INFO.nptelLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nptel-modal-link"
                >
                  <span>Module {item.module}: {item.label}</span>
                  <ExternalLink size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
