import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/themes/prism-tomorrow.css';

marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false,
});

const renderer = new marked.Renderer();

renderer.image = (href, title, text) => {
  let html = `<img src="${href}" alt="${
    text || ''
  }" loading="lazy" style="max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1.5rem 0; display: block;"`;
  if (title) {
    html += ` title="${title}"`;
  }
  html += '>';
  return html;
};

renderer.code = (code, language) => {
  const lang = language || 'text';
  return `<pre class="language-${lang}"><code class="language-${lang}">${escapeHtml(
    code
  )}</code></pre>`;
};

renderer.codespan = (code) => {
  return `<code>${escapeHtml(code)}</code>`;
};

marked.use({ renderer });

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function parseMarkdown(markdown) {
  if (!markdown) {
    return '';
  }

  try {
    const html = marked.parse(markdown);
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p',
        'br',
        'strong',
        'em',
        'u',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'ul',
        'ol',
        'li',
        'blockquote',
        'code',
        'pre',
        'a',
        'img',
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td',
        'hr',
        'div',
        'span',
      ],
      ALLOWED_ATTR: [
        'href',
        'src',
        'alt',
        'title',
        'class',
        'loading',
        'id',
        'style',
      ],
      ALLOW_DATA_ATTR: false,
    });
  } catch (error) {
    return `<p>Ошибка при парсинге Markdown: ${
      error instanceof Error ? error.message : 'Unknown error'
    }</p>`;
  }
}

export function renderMarkdown(container, markdown) {
  if (!container) return;

  const html = parseMarkdown(markdown);
  container.innerHTML = html;

  const codeBlocks = container.querySelectorAll('pre code[class*="language-"]');
  codeBlocks.forEach((block) => {
    Prism.highlightElement(block);
  });

  const images = container.querySelectorAll('img[loading="lazy"]');
  images.forEach((img) => {
    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });
    if (img.complete) {
      img.classList.add('loaded');
    }
  });
}
