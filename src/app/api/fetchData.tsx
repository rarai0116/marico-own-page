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

export const fetchPost = async (path: string): Promise<Post> => {
  console.log('Fetching posts:', path);
  const res = await fetch(`${WORDPRESS_REST_ROOT_URL}${path}`, {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = (await res.json()) as Post;
  return data;
};

const fetchWorksPosts = async (path: string): Promise<Post[]> => {
  console.log('Fetching posts:', path);
  const res = await fetch(`${WORDPRESS_REST_ROOT_URL}/posts?categories=works`, {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = (await res.json()) as Post[];
  return data;
};
