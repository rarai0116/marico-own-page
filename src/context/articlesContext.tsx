'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import type {WpArticlePost} from '@/app/api/fetchData';

type ArticlePost = {
  id: number;
  title: string;
  modified?: Date;
  content: string;
  tags: string[];
  iconPath?: string;
};
export type ArticlesContextProps = {
  readonly children: React.ReactNode;
  readonly posts: WpArticlePost[];
};

type ArticlesContextType = {
  articles: ArticlePost[];
};

export const ArticlesContext = createContext<ArticlesContextType>(
  {} as ArticlesContextType,
);

const ArticlesContextProvider = (props: ArticlesContextProps) => {
  const articles = useMemo(() => {
    console.log('articles', props.posts);
    return props.posts
      .reduce((acc: ArticlePost[], cur) => {
        if (cur.title.length === 0) return acc;
        if (cur.content.length === 0) return acc;
        if (cur.tags.length === 0) return acc;
        if (!cur['wp:featuredmedia']) return acc;
        const id = cur.id;
        const title = cur.title;
        const content = cur.content;
        const modified =
          new Date(cur.modified) instanceof Date
            ? new Date(cur.modified)
            : undefined;
        if (!modified) return acc;
        const iconPath = cur['wp:featuredmedia'];
        const tags = cur.tags.map((tag: {name: string}) => tag.name);
        return [...acc, {id, title, modified, content, tags, iconPath}];
      }, [])
      .sort((a, b) => {
        if (a.modified && b.modified) {
          return a.modified.getTime() - b.modified.getTime();
        }

        return 0;
      });
  }, [props.posts]);
  const value = useMemo(() => ({articles}), [articles]);

  return (
    <ArticlesContext.Provider value={value}>
      {props.children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within a ArticlesProvider');
  }

  return context;
};

export default ArticlesContextProvider;
