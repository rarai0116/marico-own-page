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

export const WorksContext = createContext<ArticlesContextType>(
  {} as ArticlesContextType,
);

const ArticlesContextProvider = (props: ArticlesContextProps) => {
  const articles = useMemo(() => {
    return props.posts
      .reduce((acc: ArticlePost[], cur) => {
        if (cur.title.rendered.length === 0) return acc;
        if (cur.content.rendered.length === 0) return acc;
        if (cur.tag_info.length === 0) return acc;
        if (!cur._embedded['wp:featuredmedia']) return acc;
        const id = cur.id;
        const title = cur.title.rendered;
        const content = cur.content.rendered;
        const modified =
          new Date(cur.modified) instanceof Date
            ? new Date(cur.modified)
            : undefined;
        if (!modified) return acc;
        const iconPath = cur._embedded['wp:featuredmedia'][0]?.source_url;
        const tags = cur.tag_info.map((tag: {name: string}) => tag.name);
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
    <WorksContext.Provider value={value}>
      {props.children}
    </WorksContext.Provider>
  );
};

export const useWorks = () => {
  const context = useContext(WorksContext);
  if (!context) {
    throw new Error('useWorks must be used within a WorksProvider');
  }

  return context;
};

export default ArticlesContextProvider;
