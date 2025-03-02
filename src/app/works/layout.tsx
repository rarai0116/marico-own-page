import {fetchWorksPosts} from '../api/fetchData';
import type {Work} from '../../context/worksContext';
import FlexibleMenu from '@/components/organisms/flexibleMenu';
import WorksProviders from '@/context/worksProviders';
import Header from '@/components/parts/header';

const WorksLayout = async ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  console.log('WorksLayout');
  const post = await fetchWorksPosts().catch((error: unknown) => {
    console.error('Error:', error);
    throw new Error('Error fetching post');
  });
  const works = post.reduce((acc: Record<string, Work[]>, cur) => {
    if (cur['wp:featuredmedia'] === false) return acc;
    if (cur.title.length === 0) return acc;
    if (cur.content.length === 0) return acc;
    if (cur.tags.length === 0) return acc;

    const title = cur.title;
    const content = cur.content;
    const iconPath = cur['wp:featuredmedia'];
    const id = cur.id;
    const tags = cur.tags.map((tag: {name: string}) => tag.name);
    return {
      ...acc,
      [tags[0]]: [
        ...(acc[tags[0]] ?? []),
        {title, content, iconPath, tags, id},
      ],
    };
  }, {});
  return (
    <WorksProviders works={works}>
      <main>
        <FlexibleMenu />
        <Header id={314} tagName="/works_header" />
        {children}
      </main>
    </WorksProviders>
  );
};

export default WorksLayout;
