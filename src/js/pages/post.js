import { loadPosts, loadPostContent, formatDate } from '../posts.js';
import { renderMarkdown } from '../markdown.js';
import { t, getCurrentLang, translateCategory } from '../i18n.js';

export async function renderPost(container, postId) {
  container.innerHTML = `
    <div class="page__loading" id="post-loading">${t('loading')}</div>
    <div class="page__post" id="post-content"></div>
  `;

  const loadingEl = document.getElementById('post-loading');
  const contentEl = document.getElementById('post-content');
  const lang = getCurrentLang();

  try {
    const posts = await loadPosts();
    const post = posts.find((p) => p.id === postId);

    if (!post) {
      contentEl.innerHTML = `
        <div class="page__alert">${t('posts.not_found')}</div>
        <a href="#/" class="button button--outlined">${t('post.back')}</a>
      `;
      loadingEl.style.display = 'none';
      return;
    }

    const title = lang === 'ru' ? post.title : post.titleEn;
    const markdownContent = await loadPostContent(post.id, post.markdownFile);

    contentEl.innerHTML = `
      <a href="#/" class="button button--outlined button--back">${t(
        'post.back'
      )}</a>

      <header class="page__post-header">
        <h1 class="page__post-title">${title}</h1>
        <div class="page__post-meta">
          <span class="chip">${translateCategory(post.category)}</span>
          <time class="page__post-date">${formatDate(post.date, lang)}</time>
        </div>
        ${
          post.tags && post.tags.length > 0
            ? `<div class="page__post-tags">
               ${post.tags
                 .map(
                   (tag) => `<span class="chip chip--outlined">${tag}</span>`
                 )
                 .join('')}
             </div>`
            : ''
        }
      </header>

      <div class="markdown" id="post-markdown"></div>
    `;

    const markdownEl = document.getElementById('post-markdown');
    renderMarkdown(markdownEl, markdownContent);

    loadingEl.style.display = 'none';
  } catch (error) {
    contentEl.innerHTML = `
      <div class="page__alert">Ошибка загрузки поста</div>
      <a href="#/" class="button button--outlined">${t('post.back')}</a>
    `;
    loadingEl.style.display = 'none';
  }
}
