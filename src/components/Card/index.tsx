import { Card } from "flowbite-react";
import Image from "next/image";
import { FC, useState } from "react";

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: number[];
}

export const BlogPostCard: FC<BlogPostCardProps> = ({
  title,
  excerpt,
  imageUrl,
  categories,
}) => {
  const [shouldUseFallback, setShouldUseFallback] = useState(false);

  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Image
        src={shouldUseFallback ? "/default-fallback-image.webp" : imageUrl}
        alt={title}
        width={400}
        height={300}
        onError={() => setShouldUseFallback(true)}
      />

      <div className="p-5">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {excerpt}
        </p>
      </div>
    </div>
  );
};
