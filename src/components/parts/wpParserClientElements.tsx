'use client';
import {JSDOM} from 'jsdom';
import parse from 'html-react-parser';

type Props = {
  rendered: string;
};

const WpClientParserElements = ({rendered}: Props) => {
  return parse(rendered);
};

export default WpClientParserElements;
