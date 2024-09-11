import {fetchArticlePosts} from '../api/fetchData';
import FlexibleMenu from '@/components/organisms/flexibleMenu';
import ArticlesProviders from '@/context/articlesProviders';

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
        {children}
      </main>
    </ArticlesProviders>
  );
};

export default WorksLayout;
