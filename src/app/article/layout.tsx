import {fetchArticlePosts} from '../api/fetchData';
import FlexibleMenu from '@/components/organisms/flexibleMenu';
import ArticlesProviders from '@/context/articlesProviders';
import Header from '@/components/parts/header';

const WorksLayout = async ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  const posts = await fetchArticlePosts().catch((error: unknown) => {
    console.error('Error:', error);
    throw new Error('Error fetching post');
  });
  return (
    <ArticlesProviders posts={posts}>
      <main>
        <FlexibleMenu />
        <Header id={318} tagName="/article_header" />
        {children}
      </main>
    </ArticlesProviders>
  );
};

export default WorksLayout;
