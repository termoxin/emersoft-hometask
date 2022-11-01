export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: number[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export type JSONBlogData = {
  posts: BlogPost[];
  categories: Category[];
};

export interface BlogPostsRequestParams {
  page: number;
  query?: string;
  category?: Category | null;
}
