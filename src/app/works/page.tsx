'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useMemo} from 'react';
import {useWorks} from '@/context/worksContext';

const Works = () => {
  const {works} = useWorks();
  const worksKeys = useMemo(
    () =>
      Object.keys(works)
        .reduce((acc: string[], cur) => {
          if (Number.isNaN(Number(cur))) return acc;
          return [...acc, cur];
        }, [])
        .sort((a, b) => Number(b) - Number(a)),
    [works],
  );

  return (
    <div className="flex flex-col ml-[5%] mb-[10%] w-[90%] pr-24">
      {worksKeys.map((key) => {
        if (Number.isNaN(Number(key))) return null;
        return (
          <div key={`works_year_${key}`}>
            <p>{key}</p>
            <div className="flex flex-row flex-wrap items-center">
              {works[key].map((work) => {
                const workKey = `${key}_${work.id}`;
                return (
                  <div
                    key={`work_${workKey}`}
                    className="mx-[5%] my-[10%] w-auto"
                  >
                    <Link
                      key={`link_${workKey}`}
                      href={`/works/${workKey}`}
                      className="icon-img"
                    >
                      <Image
                        key={`works_icon_${work.title}`}
                        className="h-full max-h-[150px] w-auto "
                        src={work.iconPath}
                        alt={work.title}
                        width={150}
                        height={150}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Works;
