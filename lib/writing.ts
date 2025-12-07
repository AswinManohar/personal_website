import path from "path";
import fs from "fs";
import { getMdxContent, MaybeContent } from "./mdx";

export interface Post {
  title: string;
  description: string;
  image: string;
  date: string;
  url: string;
  external: boolean;
  source: string;
  tags?: string[];
}


//* /Function getAllSlugs():
/* Retrieves an array of slugs (URL components) for posts that are not marked as external:
Calls getAllPostData() to get the full array of posts.
Filters the posts using .filter(item => !item.external) to include only those posts that are not external.
Maps over the filtered array to extract the url propert */

export function getAllPostData(): Post[] {
  return JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "content", "writing", "external.json"),
      "utf8"
    )
  );
}

export function getAllSlugs(): string[] {
  const data = getAllPostData();

  return data.filter((item) => !item.external).map((item) => item.url);
}

export async function getPost(slug: string): Promise<MaybeContent<Post>> {
  return getMdxContent<Post>("writing", `${slug}.mdx`);
}