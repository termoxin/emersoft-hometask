import { Button, Dropdown } from "flowbite-react";
import { FC, useRef } from "react";
import { Category } from "../../../types";

interface SearchProps {
  categories: Category[];
  onChangeCategory: (category: Category) => void;
  onChangeInput: (value: string) => void;
  selectedCategory: (category: Category) => void;
}

export const Search: FC<SearchProps> = ({
  categories,
  selectedCategory,
  onChangeInput,
  onChangeCategory,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex">
      <label
        htmlFor="search-dropdown"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
      >
        Your Email
      </label>

      <Dropdown
        label={selectedCategory?.name || "All"}
        size="md"
        style={{ borderEndEndRadius: 0, borderStartEndRadius: 0, height: 42 }}
        gradientDuoTone="purpleToBlue"
      >
        {categories.map((category) => (
          <Dropdown.Item
            key={category.id}
            onClick={() => {
              onChangeCategory(category);
            }}
          >
            {category.name}
          </Dropdown.Item>
        ))}
      </Dropdown>
      <div className="relative w-full">
        <input
          type="search"
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search by blog post title..."
          ref={inputRef}
          required
        />
        <button
          type="submit"
          className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl"
          onClick={() => {
            const value = inputRef?.current?.value;
            onChangeInput(value || "");
          }}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
};
