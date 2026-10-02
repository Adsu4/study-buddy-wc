import React, { useEffect, useState } from 'react';
import { Highlighter, MessageSquare, Copy, Check } from 'lucide-react';

export default function HighlightToolbar({ onAddHighlight }) {
  const [position, setPosition] = useState(null);
  const [selectedText, setSelectedText] = useState('');
  const [copied, setCopied] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [selectedColor, setSelectedColor] = useState('yellow');

  useEffect(() => {
    function handleSelectionChange() {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        if (!showNoteInput) {
          setPosition(null);
          setSelectedText('');
        }
        return;
      }

      const text = selection.toString().trim();
      if (text.length < 3) {
        if (!showNoteInput) setPosition(null);
        return;
      }

      // Check if selection is within the reader body
      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const readerBody = document.getElementById('distraction-free-reader-body');

      if (readerBody && (readerBody.contains(container) || readerBody === container)) {
        const rect = range.getBoundingClientRect();
        setPosition({
          top: rect.top - 50 + window.scrollY,
          left: rect.left + rect.width / 2 + window.scrollX
        });
        setSelectedText(text);
      }
    }

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [showNoteInput]);

  function handleColorClick(color) {
    if (showNoteInput) {
      setSelectedColor(color);
      return;
    }
    onAddHighlight({
      text: selectedText,
      color: color,
      note: ''
    });
    // Clear selection
    window.getSelection()?.removeAllRanges();
    setPosition(null);
  }

  function handleSaveWithNote() {
    onAddHighlight({
      text: selectedText,
      color: selectedColor,
      note: noteText
    });
    window.getSelection()?.removeAllRanges();
    setPosition(null);
    setShowNoteInput(false);
    setNoteText('');
  }

  function handleCopy() {
    if (selectedText) {
      navigator.clipboard.writeText(selectedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  if (!position) return null;

  return (
    <div
      className="floating-highlight-toolbar"
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateX(-50%)'
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {!showNoteInput ? (
        <div className="toolbar-inner">
          <span className="toolbar-label">Highlight:</span>
          <button
            className="color-dot-btn yellow"
            title="Highlight Yellow"
            onClick={() => handleColorClick('yellow')}
          />
          <button
            className="color-dot-btn green"
            title="Highlight Mint"
            onClick={() => handleColorClick('green')}
          />
          <button
            className="color-dot-btn blue"
            title="Highlight Cyan"
            onClick={() => handleColorClick('blue')}
          />
          <button
            className="color-dot-btn pink"
            title="Highlight Rose"
            onClick={() => handleColorClick('pink')}
          />

          <div className="toolbar-divider" />

          <button
            className="toolbar-action-btn"
            title="Add Note with Highlight"
            onClick={() => setShowNoteInput(true)}
          >
            <MessageSquare size={14} /> Note
          </button>

          <button
            className="toolbar-action-btn"
            title="Copy Text"
            onClick={handleCopy}
          >
            {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
          </button>
        </div>
      ) : (
        <div className="note-input-popover">
          <input
            type="text"
            placeholder="Add your study remark / formula note..."
            value={noteText}
            autoFocus
            onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveWithNote();
            }}
          />
          <div className="popover-actions">
            <div className="mini-color-picker">
              {['yellow', 'green', 'blue', 'pink'].map((col) => (
                <button
                  key={col}
                  className={`color-dot-btn ${col} ${selectedColor === col ? 'selected' : ''}`}
                  onClick={() => setSelectedColor(col)}
                />
              ))}
            </div>
            <div className="popover-btns">
              <button
                className="btn-text-sm"
                onClick={() => {
                  setShowNoteInput(false);
                  setPosition(null);
                }}
              >
                Cancel
              </button>
              <button className="btn-primary-sm" onClick={handleSaveWithNote}>
                Save Highlight
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
