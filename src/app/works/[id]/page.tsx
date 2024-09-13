'use client';
import {useMemo, useContext} from 'react';
import {useWorks, WorksContext} from '@/context/worksContext';
import WpClientParserElements from '@/components/parts/wpParserClientElements';

const WorkPage = ({params}: {readonly params: {id: string}}) => {
  const {works} = useWorks();
  const {content,title,year} = useMemo(() => {
    if (!works) return {content: '',title: '',year: ''};
    const year = params.id.split('_')[0];
    const id = Number(params.id.split('_')[1]);
    if (Number.isNaN(id)) return {content: '',title: '',year: ''};
    const work = works[year].find((work) => work.id === id);
    if (!work) return {content: '',title: '',year: ''};
    const content = work.content;
    const title = work.title;
    return {content,title,year};
  }, [params.id, works]);

  return (
    <div className="flex flex-col ml-[5%] mb-[10%] w-[90%] pr-24 text-custom-cyan">
      <div className='text-xl'>
        <span className='mb-7 mr-5'>
          <WpClientParserElements rendered={title} />
        </span>
      <WpClientParserElements rendered={year} />
      </div>
      <WpClientParserElements rendered={content} />
    </div>
  );
};

export default WorkPage;
