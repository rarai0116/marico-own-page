import {fetchArticlePosts} from '../api/fetchData';
import FlexibleMenu from '@/components/organisms/flexibleMenu';
import ArticlesContextProvider from '@/context/articlesContext';

const WorksLayout = async ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  const posts = await fetchArticlePosts(1).catch((error: unknown) => {
    console.error('Error:', error);
    throw new Error('Error fetching post');
  });
  return (
    <ArticlesContextProvider posts={posts}>
      <main>
        <FlexibleMenu />
        {children}
      </main>
    </ArticlesContextProvider>
  );
};

export default WorksLayout;
