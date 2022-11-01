import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { Pagination as FlowbitePagination } from "flowbite-react";

import { BlogPost, BlogPostsRequestParams } from "../../../types";

interface PaginationProps {
  page: number;
  data?: { posts: BlogPost[]; hasMore: boolean; totalPages: number };
  setParams: Dispatch<SetStateAction<BlogPostsRequestParams>>;
}

export const Pagination: FC<PaginationProps> = ({
  page: currentPage,
  data,
  setParams,
}) => {
  const onPageChange = useCallback(
    (page: number) => {
      if (page !== data?.totalPages && page !== currentPage) {
        window.scrollTo(0, 0);
      }

      setParams((state) => ({ ...state, page }));
    },
    [currentPage, data?.totalPages, setParams]
  );

  return (
    <>
      {!!data?.posts.length && (
        <div className="flex flex-col items-center justify-center text-center mt-6">
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {data?.totalPages}
            </span>{" "}
            pages
          </p>
          <FlowbitePagination
            currentPage={currentPage}
            layout="navigation"
            onPageChange={onPageChange}
            showIcons={true}
            totalPages={data?.totalPages || 0}
          />
        </div>
      )}
    </>
  );
};
