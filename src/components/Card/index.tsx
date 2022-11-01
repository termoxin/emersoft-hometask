import { Badge } from "flowbite-react";
import Image from "next/image";
import { FC, useState } from "react";

import { Category } from "../../../types";
import { CATEGORY_COLORS, DEFAULT_FALLBACK_IMAGE } from "./Card.constant";

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: Category[];
}

export const BlogPostCard: FC<BlogPostCardProps> = ({
  title,
  excerpt,
  imageUrl,
  categories,
}) => {
  const [shouldUseFallback, setShouldUseFallback] = useState(false);

  const categoriesElements = categories.map((category) => (
    <Badge
      key={category.id}
      className={`text-gray-800 ${CATEGORY_COLORS[category.id] || "gray"}`}
      size="sm"
    >
      {category.name}
    </Badge>
  ));

  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Image
        src={shouldUseFallback ? DEFAULT_FALLBACK_IMAGE : imageUrl}
        alt={title}
        width={400}
        height={300}
        onError={() => setShouldUseFallback(true)}
      />
      <div className="p-5">
        <div className="flex gap-2 mb-4">{categoriesElements}</div>

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
