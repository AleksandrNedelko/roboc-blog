import { loadPosts, formatDate } from '../posts.js';
import { t, getCurrentLang, translateCategory } from '../i18n.js';

export async function renderBlog(container) {
  container.innerHTML = `
    <div class="banner banner--blog">
      <h1 class="banner__title">${t('blog.title')}</h1>
      <h2 class="banner__subtitle">${t('blog.subtitle')}</h2>
      <p class="banner__description">${t('blog.description')}</p>
    </div>

    <div class="page__loading" id="blog-loading">${t('loading')}</div>
    <div class="page__posts" id="blog-posts"></div>
  `;

  const loadingEl = document.getElementById('blog-loading');
  const postsEl = document.getElementById('blog-posts');
  const lang = getCurrentLang();

  try {
    const posts = await loadPosts();

    if (posts.length === 0) {
      postsEl.innerHTML = `<div class="page__alert">${t('posts.not_found')}</div>`;
      loadingEl.style.display = 'none';
      return;
    }

    postsEl.innerHTML = posts
      .map((post) => {
        const title = lang === 'ru' ? post.title : post.titleEn;
        const preview = lang === 'ru' ? post.preview : post.previewEn;
        const imageHtml = post.image
          ? `<div class="card__image-wrapper">
               <img src="${post.image}" alt="${title}" class="card__image" loading="lazy" />
             </div>`
          : '';

        return `
          <article class="card card--post">
            <a href="#/post/${post.id}" class="card__link">
              ${imageHtml}
              <div class="card__content">
                <div class="card__header">
                  <h2 class="card__title">${title}</h2>
                </div>
                <p class="card__preview">${preview}</p>
                <div class="card__footer">
                  <time class="card__date">${formatDate(post.date, lang)}</time>
                  ${post.tags && post.tags.length > 0
                    ? `<div class="card__tags">
                         ${post.tags.map((tag) => `<span class="chip chip--outlined">${tag}</span>`).join('')}
                       </div>`
                    : ''}
                </div>
              </div>
            </a>
          </article>
        `;
      })
      .join('');

    loadingEl.style.display = 'none';
  } catch (error) {
    postsEl.innerHTML = `<div class="page__alert">${t('posts.not_found')}</div>`;
    loadingEl.style.display = 'none';
  }
}
