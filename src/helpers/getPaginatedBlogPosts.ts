import { POSTS_PER_PAGE } from "../constant";
import { JSONBlogData } from "../../types";

export const getPaginatedBlogPosts = (data: JSONBlogData, page: number) => {
  const posts = data.posts.slice(
    (page - 1) * POSTS_PER_PAGE,
    (page - 1) * POSTS_PER_PAGE + 10
  );

  const hasMore = !!data.posts.slice(
    page * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE + 10
  ).length;

  return {
    items: posts,
    page,
    total: data.posts.length,
    hasMore,
  };
};
