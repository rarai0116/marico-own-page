import {fetchPost} from './api/fetchData';
import SideMenu from '@/components/parts/sideMenu';
import WpParserElements from '@/components/parts/wpParserElements';

const Home = async () => {
  const post = await fetchPost('/pages/33').catch((error: unknown) => {
    console.error('Error:', error);
    throw new Error('Error fetching post');
  });
  return (
    <main>
      <SideMenu />
      <div className="flex w-[90%] h-[100vh] pr-24 justify-center items-center">
        <WpParserElements rendered={post.content.rendered} />
      </div>
    </main>
  );
};

export default Home;
