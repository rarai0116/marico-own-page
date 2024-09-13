import {fetchWorksPosts} from '../api/fetchData';
import type {Work} from '../../context/worksContext';
import FlexibleMenu from '@/components/organisms/flexibleMenu';
import WorksProviders from '@/context/worksProviders';

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
    //降降
    tags.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
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
        {children}
      </main>
    </WorksProviders>
  );
};

export default WorksLayout;
