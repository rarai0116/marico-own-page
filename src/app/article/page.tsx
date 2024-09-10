'use client';
import {useState, useCallback, useEffect} from 'react';
import {fetchPost} from '../api/fetchData';
import {fetchArticlePosts} from '../api/fetchData';
import WpClientParserElements from '@/components/parts/wpParserClientElements';
import FlexibleMenu from '@/components/organisms/flexibleMenu';
import ArticleCard from '@/components/parts/articleCard';

export type ArticlePost = {
  id: number;
  title: string;
  modified?: Date;
  content: string;
  tags: string[];
  iconPath?: string;
};
const Article = () => {
  const [pageNum, setPageNum] = useState(1);
  const [posts, setPosts] = useState<Set<ArticlePost>>(new Set());

  const fetchPosts = useCallback(async () => {
    const post = await fetchArticlePosts(pageNum).catch((error: unknown) => {
      console.error('Error:', error);
      throw new Error('Error fetching post');
    });
    console.log('post:', post);

    const articles = post.reduce((acc: ArticlePost[], cur) => {
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
    }, []);
    // articlesをmodified順でソート
    articles.sort((a, b) => {
      if (a.modified && b.modified) {
        return a.modified.getTime() - b.modified.getTime();
      }

      return 0;
    });
    console.log('articles:', articles);
    return articles;
  }, [pageNum]);

  useEffect(() => {
    fetchPosts()
      .then((articles) => {
        setPosts((prev) => new Set(articles));
      })
      .catch((error: unknown) => {
        console.error('Error:', error);
        throw new Error('Error fetching post');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col ml-[5%] mb-[10%] w-[90%] pr-24">
      {[...posts].map((post, num) => {
        console.log('post:', post);
        return (
          <div key={post.id} className="mb-[20px]">
            <ArticleCard
              tags={post.tags}
              title={post.title}
              modified={post.modified!}
              iconPath={post.iconPath}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Article;
