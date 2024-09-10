'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useWorks} from '@/context/worksContext';

const Works = () => {
  const {works} = useWorks();
  return (
    <div className="flex flex-col ml-[5%] mb-[10%] w-[90%] pr-24">
      {Object.keys(works).map((key) => {
        return (
          <div key={`works_year_${key}`}>
            <p>{key}</p>
            {works[key].map((work) => {
              const workKey = `${key}_${work.id}`;
              return (
                <Link key={`link_${workKey}`} href={`/works/${workKey}`}>
                  <Image
                    key={`works_icon_${work.title}`}
                    src={work.iconPath}
                    alt={work.title}
                    width={150}
                    height={150}
                  />
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Works;
