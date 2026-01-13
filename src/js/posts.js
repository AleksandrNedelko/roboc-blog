export async function loadPosts() {
  try {
    const response = await fetch('/posts/posts.json');
    if (!response.ok) {
      throw new Error(`Failed to load posts: ${response.statusText}`);
    }
    const data = await response.json();
    let posts = data.posts || [];

    const localPosts = loadLocalPosts();
    posts = [...posts, ...localPosts];

    posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return posts;
  } catch (error) {
    return [];
  }
}

export function loadLocalPosts() {
  const localPosts = [];
  const metadata = localStorage.getItem('blog_posts_metadata');

  if (metadata) {
    try {
      const postsData = JSON.parse(metadata);
      postsData.posts.forEach((post) => {
        const markdownKey = `blog_posts_${post.id}`;
        const markdown = localStorage.getItem(markdownKey);
        if (markdown) {
          localPosts.push(post);
        }
      });
    } catch (error) {
    }
  }

  return localPosts;
}

export async function loadPostContent(postId, markdownFile) {
  try {
    const localMarkdown = localStorage.getItem(`blog_posts_${postId}`);
    if (localMarkdown) {
      return localMarkdown;
    }

    const response = await fetch(`/posts/${markdownFile}`);
    if (!response.ok) {
      throw new Error(`Failed to load markdown: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    throw error;
  }
}

export function formatDate(dateString, lang = 'ru') {
  const date = new Date(dateString);
  return date.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
