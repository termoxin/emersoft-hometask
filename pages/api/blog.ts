import { NextApiRequest, NextApiResponse } from "next";
import { POSTS_PER_PAGE } from "../../src/constant";
import { getBlogJSON } from "../../src/helpers/getBlogJSON";
import { BlogPost, JSONBlogData } from "../../types";

const getPaginatedBlogPosts = (data: JSONBlogData, page: number) => {
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

export default async function blogHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, category, page = 1 } = req.query;

  let response: BlogPost[];

  const data = await getBlogJSON();

  response = data.posts;

  if (query) {
    response = response.filter((item) =>
      item.title.toLowerCase().includes((query as string).toLowerCase())
    );
  }

  if (category) {
    response = response.filter((item) => item.categories.includes(+category));
  }

  const paginated = getPaginatedBlogPosts(
    { posts: response, categories: data.categories },
    +page
  );

  res.status(200).json({ posts: paginated.items, hasMore: paginated.hasMore });
}
