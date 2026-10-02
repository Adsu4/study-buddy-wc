import katex from 'katex';

export function renderMathInText(text) {
  if (!text) return '';

  // Render display math $$...$$
  let processed = text.replace(/\$\$(.+?)\$\$/gs, (match, formula) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: true,
        throwOnError: false
      });
    } catch {
      return `<div class="math-block-display"><code>${formula}</code></div>`;
    }
  });

  // Render inline math $...$
  processed = processed.replace(/\$([^\$\n]+?)\$/g, (match, formula) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: false,
        throwOnError: false
      });
    } catch {
      return `<code class="math-inline">${formula}</code>`;
    }
  });

  return processed;
}

export function formatRichContent(markdown, activeHighlights = []) {
  if (!markdown) return '';

  // First process headings, lists, bold, blockquotes, tables
  let html = markdown
    // Headings
    .replace(/^#### (.*$)/gim, '<h4 class="article-h4">$1</h4>')
    .replace(/^### (.*$)/gim, '<h3 class="article-h3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="article-h2">$1</h2>')
    // Bold & italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Blockquotes
    .replace(/^\> (.*$)/gim, '<blockquote class="article-blockquote">$1</blockquote>')
    // Tables
    .replace(/\|(.+)\|/g, function (match) {
      const cells = match.split('|').filter(c => c.trim().length > 0);
      if (match.includes('---')) return '';
      return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
    })
    // Unordered lists
    .replace(/^\s*\*\s+(.*$)/gim, '<li class="article-li">$1</li>')
    .replace(/^\s*-\s+(.*$)/gim, '<li class="article-li">$1</li>')
    // Paragraph breaks
    .replace(/\n\n/g, '<p class="article-p"></p>');

  // Render LaTeX math
  html = renderMathInText(html);

  // Apply active highlights visually into the rendered text if present
  if (activeHighlights && activeHighlights.length > 0) {
    activeHighlights.forEach((hl) => {
      if (hl.text && hl.text.length > 3) {
        // Safe regex escape
        const escaped = hl.text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`(${escaped})`, 'gi');
        html = html.replace(regex, `<mark class="inline-user-highlight color-${hl.color}" data-hl-id="${hl.id}" title="${hl.note ? 'Note: ' + hl.note.replace(/"/g, '&quot;') : 'Highlighted snippet'}">$1</mark>`);
      }
    });
  }

  return html;
}
