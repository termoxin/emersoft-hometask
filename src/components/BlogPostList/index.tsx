import { FC } from "react";

import { BlogPost, Category } from "../../../types";
import { BlogPostCard } from "../Card";

interface BlogPostListProps {
  categories: Category[];
  posts: BlogPost[];
}

const getCategoriesListByIds = (
  categoryIds: number[],
  categories: Category[]
): Category[] =>
  categoryIds.map((id) =>
    categories.find((category) => category.id === id)
  ) as Category[];

export const BlogPostList: FC<BlogPostListProps> = ({ categories, posts }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center mt-10">
    {posts.map((post) => (
      <BlogPostCard
        key={post.id}
        {...post}
        categories={getCategoriesListByIds(post.categories, categories)}
      />
    ))}
  </div>
);
