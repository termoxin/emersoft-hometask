import { FC } from "react";

import { BlogPost, Category } from "../../../types";
import { BlogPostCard } from "../Card";
import { getCategoriesListByIds } from "./BlogPostList.helpers";

interface BlogPostListProps {
  categories: Category[];
  posts: BlogPost[];
}

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
