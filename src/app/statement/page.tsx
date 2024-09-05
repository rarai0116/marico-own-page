import {fetchPost} from '../api/fetchData';
import WpParserElements from '@/components/parts/wpParserElements';
import FlexibleMenu from '@/components/organisms/flexibleMenu';

const Statement = async () => {
  const post = await fetchPost('/pages/23').catch((error: unknown) => {
    console.error('Error:', error);
    throw new Error('Error fetching post');
  });
  return (
    <main>
      <FlexibleMenu />
      <div className="flex flex-col ml-[5%] mb-[10%] w-[90%] pr-24">
        <WpParserElements post={post} />
      </div>
    </main>
  );
};

export default Statement;
