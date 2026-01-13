let darkMode = false;

export function initTheme() {
  const saved = localStorage.getItem('blog_theme');
  if (saved) {
    darkMode = saved === 'dark';
  } else {
    darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  applyTheme();
  return darkMode;
}

export function applyTheme() {
  const html = document.documentElement;
  if (darkMode) {
    html.classList.add('theme-dark');
    html.classList.remove('theme-light');
  } else {
    html.classList.add('theme-light');
    html.classList.remove('theme-dark');
  }
  localStorage.setItem('blog_theme', darkMode ? 'dark' : 'light');
}

export function toggleTheme() {
  darkMode = !darkMode;
  applyTheme();
  return darkMode;
}

export function isDarkMode() {
  return darkMode;
}
