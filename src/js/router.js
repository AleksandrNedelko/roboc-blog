import { renderHome } from './pages/home.js';
import { renderBlog } from './pages/blog.js';
import { renderPost } from './pages/post.js';
import { renderAbout } from './pages/about.js';

let currentRoute = '';
let currentParam = '';

export function initRouter() {
  handleRoute();

  window.addEventListener('hashchange', handleRoute);

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) {
        const hash = href.startsWith('#') ? href.substring(1) : href;
        window.location.hash = hash;
        setTimeout(() => handleRoute(), 0);
      }
    }
  });
}

function handleRoute() {
  const hash = window.location.hash.substring(1);
  const cleanHash = hash.startsWith('/') ? hash.substring(1) : hash;
  const path = cleanHash ? cleanHash.split('/').filter((p) => p) : [];
  const route = path[0] || '/';
  const param = path[1];

  if (
    currentRoute &&
    currentRoute === route &&
    currentParam === (param || '')
  ) {
    return;
  }

  currentRoute = route;
  currentParam = param || '';

  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;

  pageContent.innerHTML = '';
  pageContent.className = 'page';

  switch (route) {
    case '/':
    case '':
      pageContent.classList.add('page--home');
      renderHome(pageContent);
      break;
    case 'blog':
      pageContent.classList.add('page--blog');
      renderBlog(pageContent);
      break;
    case 'post':
      if (param) {
        pageContent.classList.add('page--post');
        renderPost(pageContent, param);
      } else {
        window.location.hash = '#/blog';
      }
      break;
    case 'about':
      pageContent.classList.add('page--about');
      renderAbout(pageContent);
      break;
    default:
      window.location.hash = '#/';
      break;
  }
}
