import { Button, Progress } from "flowbite-react";
import { NextPageContext } from "next";
import { useState } from "react";
import useSWR from "swr";

import { BlogPostCard } from "../src/components/Card";
import { Search } from "../src/components/Search";
import { BlogPost, Category } from "../types";

interface HomeProps {
  posts: BlogPost[];
  categories: Category[];
  hasMore: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home({ categories, posts, hasMore }: HomeProps) {
  const [params, setParams] = useState<{
    page: number;
    query: string;
    category: string;
  } | null>({ page: 1, category: null });

  const { data, error } = useSWR<{ posts: BlogPost[]; hasMore: boolean }>(
    `/api/blog?page=${params?.page}&category=${
      params?.category?.id || ""
    }&query=${params?.query || ""}`,
    fetcher,
    {
      fallbackData: { posts, hasMore },
    }
  );

  console.log(params);

  const onNext = () =>
    setParams(
      params?.page
        ? { ...params, page: params.page + 1 }
        : { ...params, page: 2 }
    );

  const onPrev = () =>
    setParams((state) =>
      params?.page - 1 >= 1 ? { ...params, page: params?.page - 1 } : state
    );

  return (
    <div className="container mx-auto px-4 py-4">
      <Search
        categories={categories}
        selectedCategory={params?.category}
        onChangeInput={(value) =>
          setParams((state) => ({ ...state, query: value }))
        }
        onChangeCategory={(category) =>
          setParams((state) => ({ ...state, category }))
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center mt-10">
        {data?.posts.map((post) => (
          <BlogPostCard key={post.id} {...post} />
        ))}
      </div>
      <div className="flex">
        {params?.page && <Button onClick={onPrev}>Prev</Button>}

        <Button onClick={onNext} disabled={!data?.hasMore}>
          Next
        </Button>
      </div>
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
