/* eslint-disable @typescript-eslint/naming-convention */
'use server';

export type Post = {
  id: number;

  title: {
    rendered: string;
  };

  content: {
    rendered: string;
  };
};

const {REVALIDATE_SECRET_KEY, WORDPRESS_REST_ROOT_URL} = process.env;

if (!REVALIDATE_SECRET_KEY) {
  throw new Error('Missing REVALIDATE_SECRET_KEY environment variable');
}

export const revalidatePost = async (paths: string[], tags: string[]) => {
  console.log('Revalidating paths:', paths);
  const res = await fetch('/api/revalidate', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${REVALIDATE_SECRET_KEY}`, // 認証トークン
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      paths,
      tags,
    }),
  });
  console.log('Revalidation response:', res);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  console.log('Revalidation response:', res);
};

export const fetchPost = async (path: string, tag: string): Promise<Post> => {
  console.log('Fetching posts:', path);
  const res = await fetch(`${WORDPRESS_REST_ROOT_URL}wp/v2${path}`, {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = (await res.json()) as Post;
  return data;
};

type WorkPost = {
  id: number;
  title: string;
  content: string;
  tags: Array<{
    term_id: number;
    name: string;
  }>;
  'wp:featuredmedia': string | false;
};
export const fetchWorksPosts = async (): Promise<WorkPost[]> => {
  console.log('Fetching posts', `${WORDPRESS_REST_ROOT_URL}custom/v2/works`);
  const res = await fetch(`${WORDPRESS_REST_ROOT_URL}custom/v2/works`, {
    method: 'GET',
    next: {
      tags: ['works'],
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  console.log('res:', res);
  const data = (await res.json()) as WorkPost[];
  return data;
};

export type WpArticlePost = {
  id: number;
  title: string;
  modified: string;
  content: string;
  tags: Array<{
    term_id: number;
    name: string;
  }>;
  'wp:featuredmedia': string | false;
};

export const fetchArticlePosts = async (): Promise<WpArticlePost[]> => {
  const path = `${WORDPRESS_REST_ROOT_URL}custom/v2/article`;
  console.log('Fetching posts', path);
  const res = await fetch(path, {
    method: 'GET',
    next: {
      tags: ['article'],
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = (await res.json()) as WpArticlePost[];
  console.log('data:', data);
  return data;
};
