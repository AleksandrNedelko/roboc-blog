import { t } from '../i18n.js';

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatText(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }
  const lines = text.split('\n');
  const paragraphs = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed) {
      paragraphs.push(`<p>${escapeHtml(trimmed)}</p>`);
    }
  }

  return paragraphs.join('');
}

export function renderAbout(container) {
  const descriptionText = t('about.description');
  const changesText = t('about.changes.description');
  const featuresText = t('about.features.description');

  const description = formatText(descriptionText);
  const changesDescription = formatText(changesText);
  const featuresDescription = formatText(featuresText);

  container.innerHTML = `
    <div class="banner banner--about">
      <h1 class="banner__title">${t('about.title')}</h1>
      <h2 class="banner__subtitle">${t('about.subtitle')}</h2>
    </div>

    <section class="page__section">
      <article class="card">
        <div class="card__content">
          <div class="card__text">${description}</div>
        </div>
      </article>
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
    if (card.getBoundingClientRect().top < window.innerHeight) {
      card.classList.add('card--visible');
    }
  });
}
