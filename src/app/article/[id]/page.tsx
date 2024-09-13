'use client';
import {useMemo, useContext} from 'react';
import Link from 'next/link';
import {useArticles} from '@/context/articlesContext';
import WpClientParserElements from '@/components/parts/wpParserClientElements';

const ArticlePage = ({params}: {readonly params: {id: string}}) => {
  const {articles} = useArticles();
  const article = useMemo(() => {
    console.log('params.id', params.id);
    console.log('articles', articles);
    if (!articles) return null;
    const id = Number(params.id);
    if (Number.isNaN(id)) return null;
    const article = articles.find((article) => article.id === id);
    if (!article) return null;
    return article;
  }, [params.id, articles]);

  return (
    <div className="flex flex-col ml-[5%] mb-[10%] w-[90%] pr-24 text-custom-cyan works-wrapper text-center">
      <h1 className="text-4xl font-bold mt-8">{article?.title}</h1>
      <p className="text-sm mt-4">{article?.modified?.toDateString()}</p>
      <div className="mt-12 text-left ml-8">
        <Link href="/article">&lt; 戻る</Link>
        <hr className="border-hr-dark-blue w-[110%] mt-4" />
      </div>
      <div className="ml-[5%] mt-8 text-left flex flex-col justify-start">
        {article && <WpClientParserElements rendered={article.content} />}
      </div>
    </div>
  );
};

export default ArticlePage;
