import path from "path";
import { promises as fs } from "fs";

import { JSONBlogData } from "../../types";

export const getBlogJSON = async (): Promise<JSONBlogData> => {
  const jsonDirectory = path.join(process.cwd(), "json");
  const fileContents = await fs.readFile(jsonDirectory + "/blog.json", "utf8");
  const parsedJson = JSON.parse(fileContents);

  return parsedJson;
};
