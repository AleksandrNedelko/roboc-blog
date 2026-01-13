let currentLang = 'ru';
let translations = {};

export function initI18n() {
  const saved = localStorage.getItem('blog_language');
  if (saved === 'ru' || saved === 'en') {
    currentLang = saved;
  } else {
    const browserLang = navigator.language || navigator.userLanguage;
    currentLang = browserLang.startsWith('ru') ? 'ru' : 'en';
  }
  localStorage.setItem('blog_language', currentLang);
  return loadTranslations(currentLang);
}

export function loadTranslations(lang) {
  return fetch(`/i18n/${lang}.json`)
    .then((res) => res.json())
    .then((data) => {
      translations = data;
      currentLang = lang;
      localStorage.setItem('blog_language', lang);
      updatePageTranslations();
      return data;
    })
    .catch((error) => {
      translations = {};
      return {};
    });
}

export function t(key, params) {
  const keys = key.split('.');
  let value = translations;

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key;
    }
  }

  if (typeof value !== 'string') {
    return key;
  }

  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
      return params[param] || match;
    });
  }
  return value;
}

export function translateCategory(category) {
  if (!category || !translations.categories) {
    return category;
  }
  return translations.categories[category] || category;
}

export function getCurrentLang() {
  return currentLang;
}

export function switchLanguage(lang) {
  if (lang === 'ru' || lang === 'en') {
    return loadTranslations(lang);
  }
}

export function updatePageTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else {
      el.textContent = text;
    }
  });
}
