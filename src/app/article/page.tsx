'use client';

import {useState, useCallback, useEffect, useMemo} from 'react';
import ArticleCard from '@/components/parts/articleCard';
import {useArticles} from '@/context/articlesContext';

export type ArticlePost = {
  id: number;
  title: string;
  modified?: Date;
  content: string;
  tags: string[];
  iconPath?: string;
};
const Article = () => {
  const {articles} = useArticles();
  const [pageNum, setPageNum] = useState(1);
  const posts = useMemo(() => {
    return new Set(articles);
  }, [articles]);
  return (
    <div className="flex flex-col ml-[5%] mb-[10%] w-[90%] pr-24">
      {[...posts].map((post, num) => {
        if (num > pageNum * 5 + 1) return null;
        return (
          <div key={post.id} className="mb-[20px]">
            <ArticleCard
              id={post.id}
              tags={post.tags}
              title={post.title}
              modified={post.modified!}
              iconPath={post.iconPath}
            />
          </div>
        );
      })}
      <div
        className={`flex justify-center text-3xl ${pageNum * 5 > articles.length ? 'hidden' : 'block'}`}
        onClick={() => {
          console.log('▲', articles.length);
          setPageNum((prev) => prev + 1);
        }}
      >
        ▼
      </div>
    </div>
  );
};

export default Article;
