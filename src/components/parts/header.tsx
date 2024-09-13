import {fetchPost} from '@/app/api/fetchData';
import WpParserElements from '@/components/parts/wpParserElements';

const Header = async ({
  id,
  tagName,
}: {
  readonly id: number;
  readonly tagName: string;
}) => {
  const post = await fetchPost(`/pages/${id}`, tagName).catch(
    (error: unknown) => {
      console.error('Error:', error);
      throw new Error('Error fetching post');
    },
  );
  return (
    <div className="ml-6">
      <WpParserElements rendered={post.content.rendered} />
    </div>
  );
};

export default Header;
