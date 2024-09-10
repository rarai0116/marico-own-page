import {fetchPost} from '../api/fetchData';
import WpParserElements from '@/components/parts/wpParserElements';
import FlexibleMenu from '@/components/organisms/flexibleMenu';

const Cv = async () => {
  const post = await fetchPost('/pages/11').catch((error: unknown) => {
    console.error('Error:', error);
    throw new Error('Error fetching post');
  });
  return (
    <main>
      <FlexibleMenu />
      <div key="page_cv" className="flex flex-col ml-[5%] mb-[10%] w-[90%]">
        <WpParserElements rendered={post.content.rendered} />
      </div>
    </main>
  );
};

export default Cv;
