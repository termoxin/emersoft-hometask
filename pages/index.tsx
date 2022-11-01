import { Card, Pagination } from "flowbite-react";
import { useCallback, useState } from "react";
import useSWR from "swr";

import { BlogPostCard } from "../src/components/Card";
import { ErrorAlert } from "../src/components/ErrorAlert";
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

  const getCategoriesListByIds = (categoryIds: number[]): Category[] =>
    categoryIds.map((id) =>
      categories.find((category) => category.id === id)
    ) as Category[];

  const isLoading = !error || isValidating;

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

          {data?.posts.length || !isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center mt-10">
              {data?.posts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  {...post}
                  categories={getCategoriesListByIds(post.categories)}
                />
              ))}
            </div>
          ) : (
            <Card href="#" className="mt-10">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Nothing found 🤷 <br />
                <span className="text-base text-right text-gray-500 dark:text-gray-400">
                  Please, try something else!
                </span>
              </h5>
            </Card>
          )}

          {!!data?.posts.length && !isLoading && (
            <div className="flex flex-col items-center justify-center text-center mt-6">
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {params.page}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {data?.totalPages}
                </span>{" "}
                pages
              </p>
              <Pagination
                currentPage={params.page}
                layout="navigation"
                onPageChange={(page) => {
                  if (page !== totalPages && params.page !== page) {
                    window.scrollTo(0, 0);
                  }

                  setParams((state) => ({ ...state, page }));
                }}
                showIcons={true}
                totalPages={data?.totalPages || 0}
              />
            </div>
          )}
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
