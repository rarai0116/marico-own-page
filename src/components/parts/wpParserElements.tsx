/* eslint-disable new-cap */
import DOMPurify from 'dompurify';
import {JSDOM} from 'jsdom';
import parse from 'html-react-parser';
import type {Post} from '@/app/api/fetchData';

type Props = {
  rendered: string;
};

const window = new JSDOM('').window;
const DomPurifyServer = DOMPurify(window);

const WpParserElements = ({rendered}: Props) => {
  const sanitizedHtml = DomPurifyServer.sanitize(rendered);

  return parse(sanitizedHtml);
};

export default WpParserElements;
