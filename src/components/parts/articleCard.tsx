'use client';
import Image from 'next/image';
import Link from 'next/link';

const ArticleCard = ({
  tags,
  title,
  iconPath,
  modified,
}: {
  readonly tags: string[];
  readonly title: string;
  readonly iconPath?: string;
  readonly modified: Date;
}) => {
  const tagStr = tags.join(' | ');
  return (
    <div className="flex justify-center flex-row mt-8">
      <div className="mr-4">
        {iconPath && (
          <Image src={iconPath} alt={title} width={150} height={150} />
        )}
      </div>
      <div className="flex flex-col">
        <p className="font-semibold text-l mt-0">{tagStr}</p>
        <p className="font-bold text-2xl mt-0">{title}</p>
        <p className="text-sm">{modified.toDateString()}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
