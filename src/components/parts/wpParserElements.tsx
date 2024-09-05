/* eslint-disable new-cap */
import DOMPurify from 'dompurify';
import {JSDOM} from 'jsdom';
import parse from 'html-react-parser';
import type {Post} from '@/app/api/fetchData';

type Props = {
  post: Post;
};

const window = new JSDOM('').window;
const DomPurifyServer = DOMPurify(window);

const WpParserElements = ({post}: Props) => {
  const sanitizedHtml = DomPurifyServer.sanitize(post.content.rendered);

  return parse(sanitizedHtml);
};

export default WpParserElements;
