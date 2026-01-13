import { t } from '../i18n.js';

export function renderHome(container) {
  container.innerHTML = `
    <div class="banner banner--home">
      <svg class="banner__robot" viewBox="0 0 400 400">
        <rect x="120" y="80" width="160" height="140" rx="10" fill="#ffffff" stroke="#000000" stroke-width="3" />
        <circle cx="160" cy="140" r="15" fill="#000000" />
        <circle cx="240" cy="140" r="15" fill="#000000" />
        <rect x="180" y="170" width="40" height="5" rx="2" fill="#000000" />
        <line x1="200" y1="80" x2="200" y2="50" stroke="#ffffff" stroke-width="4" />
        <circle cx="200" cy="45" r="8" fill="#ffffff" />
        <rect x="100" y="220" width="200" height="120" rx="10" fill="#ffffff" stroke="#000000" stroke-width="3" />
        <circle cx="180" cy="270" r="8" fill="#000000" />
        <circle cx="200" cy="270" r="8" fill="#000000" />
        <circle cx="220" cy="270" r="8" fill="#000000" />
        <rect x="60" y="230" width="50" height="20" rx="5" fill="#ffffff" stroke="#000000" stroke-width="3" />
        <rect x="290" y="230" width="50" height="20" rx="5" fill="#ffffff" stroke="#000000" stroke-width="3" />
        <rect x="120" y="340" width="40" height="50" rx="5" fill="#ffffff" stroke="#000000" stroke-width="3" />
        <rect x="240" y="340" width="40" height="50" rx="5" fill="#ffffff" stroke="#000000" stroke-width="3" />
      </svg>
    </div>

    <section class="page__section">
      <h1 class="page__title">${t('site.title')}</h1>
      <p class="page__description">${t('site.description')}</p>
      <a href="#/blog" class="button button--contained">${t(
        'home.view_blog'
      )}</a>
    </section>
  `;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('card--visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  container.querySelectorAll('.card').forEach((card) => {
    observer.observe(card);
  });
}
