import { NextApiResponse } from "next";
import { getBlogJSON } from "../../src/helpers/getBlogJSON";

export default async function blogHandler(_: unknown, res: NextApiResponse) {
  const data = await getBlogJSON();

  return res.status(200).json(data.categories);
}
