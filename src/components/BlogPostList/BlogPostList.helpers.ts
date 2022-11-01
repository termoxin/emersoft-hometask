import { Category } from "./../../../types/index";

export const getCategoriesListByIds = (
  categoryIds: number[],
  categories: Category[]
): Category[] =>
  categoryIds.map((id) =>
    categories.find((category) => category.id === id)
  ) as Category[];
