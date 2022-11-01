import { Button, Card } from "flowbite-react";
import { useCallback, useState } from "react";
import useSWR from "swr";

import { BlogPostCard } from "../src/components/Card";
import { ErrorAlert } from "../src/components/ErrorAlert";
import { Search } from "../src/components/Search";
import { BlogPost, BlogPostsRequestParams, Category } from "../types";

interface HomeProps {
  posts: BlogPost[];
  categories: Category[];
  hasMore: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const buildUrlFromParams = (params: BlogPostsRequestParams) =>
  `/api/blog?page=${params?.page}&category=${
    params?.category?.id || ""
  }&query=${params?.query || ""}`;

const defaultParams = { page: 1, category: null };

export default function Home({ categories, posts, hasMore }: HomeProps) {
  const [params, setParams] = useState<BlogPostsRequestParams>(defaultParams);

  const { data, error } = useSWR<{ posts: BlogPost[]; hasMore: boolean }>(
    buildUrlFromParams(params),
    fetcher,
    {
      fallbackData: { posts, hasMore },
    }
  );

  const onNext = useCallback(() => {
    window.scrollTo(0, 0);

    setParams(
      params?.page
        ? { ...params, page: params.page + 1 }
        : { ...params, page: 2 }
    );
  }, [params]);

  const onPrev = useCallback(() => {
    window.scrollTo(0, 0);

    setParams((state) =>
      params?.page - 1 >= 1 ? { ...params, page: params?.page - 1 } : state
    );
  }, [params]);

  return (
    <div className="container mx-auto px-4 py-4">
      {!error && (
        <>
          <Search
            categories={categories}
            selectedCategory={params?.category}
            onChangeInput={(value) =>
              setParams((state) => ({ ...state, query: value }))
            }
            onChangeCategory={(category) =>
              setParams((state) => ({ ...state, page: 1, category }))
            }
          />

          {data?.posts.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center mt-10">
              {data?.posts.map((post) => (
                <BlogPostCard key={post.id} {...post} />
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
          <div className="flex mt-8">
            {params?.page && <Button onClick={onPrev}>Prev</Button>}

            <Button onClick={onNext} className="ml-3" disabled={!data?.hasMore}>
              Next
            </Button>
          </div>
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
    },
  };
}
