'use client';
import {useMemo, useContext} from 'react';
import {useWorks, WorksContext} from '@/context/worksContext';
import WpClientParserElements from '@/components/parts/wpParserClientElements';

const WorkPage = ({params}: {readonly params: {id: string}}) => {
  const {works} = useWorks();
  const content = useMemo(() => {
    console.log('params.id', params.id);
    console.log('works', works);
    if (!works) return '';
    const year = params.id.split('_')[0];
    const id = Number(params.id.split('_')[1]);
    if (Number.isNaN(id)) return '';
    const work = works[year].find((work) => work.id === id);
    const content = work ? work.content : '';
    return content;
  }, [params.id, works]);

  return (
    <div className="flex flex-col ml-[5%] mb-[10%] w-[90%] pr-24 text-custom-cyan">
      <WpClientParserElements rendered={content} />
    </div>
  );
};

export default WorkPage;
