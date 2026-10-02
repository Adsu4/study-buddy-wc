import React, { useState } from 'react';
import { X, Trash2, ExternalLink, Download, Copy, Check, Bookmark, Search, Highlighter } from 'lucide-react';

export default function HighlightDrawer({
  isOpen,
  onClose,
  highlights,
  onDeleteHighlight,
  onClearAllHighlights,
  onSelectTopic
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const filteredHighlights = highlights.filter((h) => {
    const term = searchTerm.toLowerCase();
    return (
      h.text.toLowerCase().includes(term) ||
      (h.note && h.note.toLowerCase().includes(term)) ||
      h.topicTitle.toLowerCase().includes(term)
    );
  });

  function handleExportMarkdown() {
    let md = `# My Wireless Communication (S5) Study Buddy Highlights & Notes\n\n`;
    md += `*Generated on: ${new Date().toLocaleDateString()}*\n\n`;

    highlights.forEach((h, idx) => {
      md += `### ${idx + 1}. [${h.topicTitle}]\n`;
      md += `> "${h.text}"\n\n`;
      if (h.note) {
        md += `**My Note:** *${h.note}*\n\n`;
      }
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WC_S5_Study_Highlights_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleCopyAllMarkdown() {
    let md = `# My Wireless Communication (S5) Highlights\n\n`;
    highlights.forEach((h, idx) => {
      md += `${idx + 1}. [${h.topicTitle}]: "${h.text}"\n`;
      if (h.note) md += `   Note: ${h.note}\n`;
    });
    navigator.clipboard.writeText(md);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  }

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <Highlighter className="text-accent" size={20} />
            <div>
              <h3 className="drawer-title">My Study Highlights ({highlights.length})</h3>
              <p className="drawer-subtitle">Your personal annotated textbook excerpts and formulas</p>
            </div>
          </div>
          <button className="icon-btn-close" onClick={onClose} title="Close drawer">
            <X size={18} />
          </button>
        </div>

        {/* Search bar & batch actions */}
        <div className="drawer-controls">
          <div className="drawer-search-wrapper">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              placeholder="Search in highlights & notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {highlights.length > 0 && (
            <div className="drawer-action-btns">
              <button
                className="btn-outline-sm"
                onClick={handleCopyAllMarkdown}
                title="Copy all highlights as Markdown"
              >
                {copiedAll ? <Check size={13} className="text-success" /> : <Copy size={13} />}
                <span>{copiedAll ? "Copied!" : "Copy MD"}</span>
              </button>
              <button
                className="btn-outline-sm"
                onClick={handleExportMarkdown}
                title="Download Markdown summary"
              >
                <Download size={13} />
                <span>Export .md</span>
              </button>
              <button
                className="btn-danger-sm"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete all saved highlights?")) {
                    onClearAllHighlights();
                  }
                }}
                title="Clear all"
              >
                <Trash2 size={13} />
              </button>
            </div>
          )}
        </div>

        {/* Highlights List */}
        <div className="drawer-content-scroll">
          {filteredHighlights.length === 0 ? (
            <div className="empty-state-drawer">
              <Bookmark size={36} className="empty-icon" />
              <h4>{highlights.length === 0 ? "No Highlights Yet" : "No Matching Highlights"}</h4>
              <p>
                {highlights.length === 0
                  ? "Select any text in the textbook or classroom explanations and click a color to save your personal highlights and formulas."
                  : "Try searching for a different keyword or formula."}
              </p>
            </div>
          ) : (
            filteredHighlights.map((item) => (
              <div key={item.id} className={`highlight-card color-${item.color}`}>
                <div className="highlight-card-header">
                  <span className="highlight-topic-badge" onClick={() => { onSelectTopic(item.moduleId, item.topicId); onClose(); }}>
                    {item.topicTitle} <ExternalLink size={10} />
                  </span>
                  <button
                    className="delete-hl-btn"
                    onClick={() => onDeleteHighlight(item.id)}
                    title="Delete highlight"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <blockquote className="highlight-quote">
                  "{item.text}"
                </blockquote>

                {item.note && (
                  <div className="highlight-user-note">
                    <span className="note-label">Remark:</span> {item.note}
                  </div>
                )}

                <div className="highlight-card-footer">
                  <span className="highlight-date">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(item.timestamp).toLocaleDateString()}</span>
                  <button
                    className="jump-to-topic-btn"
                    onClick={() => {
                      onSelectTopic(item.moduleId, item.topicId);
                      onClose();
                    }}
                  >
                    Go to Topic &rarr;
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
