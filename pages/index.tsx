import { useCallback, useState } from "react";
import useSWR from "swr";
import { BlogPostList } from "../src/components/BlogPostList";

import { ErrorAlert } from "../src/components/ErrorAlert";
import { NotFound } from "../src/components/NotFound";
import { Pagination } from "../src/components/Pagination";
import { SearchBar } from "../src/components/SearchBar";
import { BlogPost, BlogPostsRequestParams, Category } from "../types";

interface HomeProps {
  posts: BlogPost[];
  categories: Category[];
  hasMore: boolean;
  totalPages: number;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const buildUrlFromParams = (params: BlogPostsRequestParams) =>
  `/api/blog?page=${params?.page}&category=${
    (params?.category?.name === "All" ? "" : params?.category?.id) || ""
  }&query=${params?.query || ""}`;

const defaultParams = { page: 1, category: null };
const ALL_CATEGORY = { id: 0, slug: "All", name: "All" };

export default function Home({
  categories,
  posts,
  hasMore,
  totalPages,
}: HomeProps) {
  const [params, setParams] = useState<BlogPostsRequestParams>(defaultParams);

  const { data, error, isValidating } = useSWR<{
    posts: BlogPost[];
    hasMore: boolean;
    totalPages: number;
  }>(buildUrlFromParams(params), fetcher, {
    fallbackData: { posts, hasMore, totalPages },
  });

  const onChangeInput = useCallback(
    (value: string) => setParams((state) => ({ ...state, query: value })),
    []
  );

  const onChangeCategory = useCallback(
    (category: Category) =>
      setParams((state) => ({ ...state, page: 1, category })),
    []
  );

  const isLoading = !error || isValidating;
  const showList = data?.posts.length || !isLoading;

  return (
    <div className="container mx-auto px-4 py-4">
      {!error && (
        <>
          <SearchBar
            categories={[ALL_CATEGORY, ...categories]}
            selectedCategory={params?.category}
            onChangeInput={onChangeInput}
            onChangeCategory={onChangeCategory}
          />

          {showList ? (
            <BlogPostList categories={categories} posts={data?.posts || []} />
          ) : (
            <NotFound />
          )}

          <Pagination page={params.page} data={data} setParams={setParams} />
        </>
      )}
      <ErrorAlert error={error} />
    </div>
  );
}

export async function getServerSideProps() {
  const blogResponse = await fetch(`${process.env.API_URL}/api/blog`);

  const categoriesResponse = await fetch(
    `${process.env.API_URL}/api/categories`
  );

  const posts = await blogResponse.json();
  const categories = await categoriesResponse.json();

  return {
    props: {
      categories,
      posts: posts.posts,
      hasMore: posts.hasMore,
      totalPages: posts.totalPages,
    },
  };
}
