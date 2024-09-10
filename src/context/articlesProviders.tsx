'use client';
import ArticlesContextProvider from './articlesContext';
import type {WpArticlePost} from '@/app/api/fetchData';

export const WorksProviders = ({
  children,
  posts,
}: {
  readonly children: React.ReactNode;
  readonly posts: WpArticlePost[];
}) => {
  return (
    <ArticlesContextProvider posts={posts}>{children}</ArticlesContextProvider>
  );
};

export default WorksProviders;
