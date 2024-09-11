import {fetchPost} from '../api/fetchData';
import WpParserElements from '@/components/parts/wpParserElements';
import FlexibleMenu from '@/components/organisms/flexibleMenu';

const Contact = async () => {
  const post = await fetchPost('/pages/27', '/contact').catch(
    (error: unknown) => {
      console.error('Error:', error);
      throw new Error('Error fetching post');
    },
  );
  return (
    <main>
      <FlexibleMenu />
      <div className="flex flex-col ml-[5%] mb-[10%] w-[90%] pr-24">
        <WpParserElements rendered={post.content.rendered} />
        <div className="mt-[500px]">this site designed by Studio Corobo</div>
      </div>
    </main>
  );
};

export default Contact;
