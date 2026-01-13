import { initI18n, t, updatePageTranslations } from './i18n.js';
import { initTheme, toggleTheme } from './theme.js';
import { initRouter } from './router.js';

async function init() {
  initTheme();

  await initI18n();

  initRouter();
  const themeToggle = document.querySelector('.header__theme-toggle');
  const drawerThemeToggle = document.querySelector('.drawer__theme-toggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      toggleTheme();
    });
  }

  if (drawerThemeToggle) {
    updateDrawerThemeText();

    drawerThemeToggle.addEventListener('click', () => {
      toggleTheme();
      updateDrawerThemeText();
      closeDrawer();
    });
  }

  const menuToggle = document.querySelector('.header__menu-toggle');
  const drawer = document.querySelector('.drawer');
  const drawerOverlay = document.querySelector('.drawer__overlay');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      openDrawer();
    });
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', () => {
      closeDrawer();
    });
  }

  const drawerLinks = document.querySelectorAll('.drawer__nav-link');
  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

function openDrawer() {
  const drawer = document.querySelector('.drawer');
  if (drawer) {
    drawer.classList.add('drawer--open');
    document.body.style.overflow = 'hidden';
  }
}

function closeDrawer() {
  const drawer = document.querySelector('.drawer');
  if (drawer) {
    drawer.classList.remove('drawer--open');
    document.body.style.overflow = '';
  }
}

function updateDrawerThemeText() {
  const drawerThemeToggle = document.querySelector('.drawer__theme-toggle');
  if (drawerThemeToggle) {
    const isDark = document.documentElement.classList.contains('theme-dark');
    drawerThemeToggle.textContent = isDark
      ? t('nav.theme_light')
      : t('nav.theme_dark');
  }
}

init();
