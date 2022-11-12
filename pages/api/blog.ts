import { NextApiRequest, NextApiResponse } from "next";

import { POSTS_PER_PAGE } from "../../src/constant";
import { getBlogJSON } from "../../src/helpers/getBlogJSON";
import { BlogPost } from "../../types";
import { getPaginatedBlogPosts } from "../../src/helpers/getPaginatedBlogPosts";

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

  res.status(200).json({
    posts: paginated.items,
    hasMore: paginated.hasMore,
    totalPages: Math.ceil(paginated.total / POSTS_PER_PAGE),
  });
}
