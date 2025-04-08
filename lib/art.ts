import path from "path";
import fs from "fs";
import { getMdxContent, MaybeContent } from "./mdx";

export interface Artwork {
  title: string;
  description: string;
  image: string;
  date: string;
  medium: string;
  url?: string;
  external?: boolean;
}

export function getAllArtworkData(): Artwork[] {
  return JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "content", "art", "external.json"),
      "utf8"
    )
  );
}

export function getAllSlugs(): string[] {
  const data = getAllArtworkData();
  return data
    .filter((item): item is Artwork & { url: string } => 
      !item.external && typeof item.url === 'string'
    )
    .map((item) => item.url);
}

export async function getArtwork(slug: string): Promise<MaybeContent<Artwork>> {
  return getMdxContent<Artwork>("art", `${slug}.mdx`);
} 