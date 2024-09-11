'use client';
import Image from 'next/image';
import Link from 'next/link';

const ArticleCard = ({
  tags,
  title,
  iconPath,
  modified,
  id,
}: {
  readonly tags: string[];
  readonly title: string;
  readonly iconPath?: string;
  readonly modified: Date;
  readonly id: number;
}) => {
  const tagStr = tags.join(' | ');
  return (
    <Link href={`/article/${id}`}>
      <div className="flex justify-left flex-row mt-8">
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
    </Link>
  );
};

export default ArticleCard;
