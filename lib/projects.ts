import path from "path";
import fs from "fs";
import { getMdxContent, MaybeContent } from "./mdx";

export interface Project {
  title: string;
  description: string;
  image: string;
  date: string;
  url: string;
  external: boolean;
  source: string;
  category: string; // The subsection (e.g., 'ML')
}

export function getAllProjectData(): Project[] {
  const projectsRoot = path.join(process.cwd(), "content", "projects");
  const categories = fs.readdirSync(projectsRoot).filter(file => 
    fs.statSync(path.join(projectsRoot, file)).isDirectory()
  );

  let allProjects: Project[] = [];

  categories.forEach(category => {
    const categoryPath = path.join(projectsRoot, category, "external.json");
    if (fs.existsSync(categoryPath)) {
      const projects = JSON.parse(fs.readFileSync(categoryPath, "utf8"));
      const projectsWithCategory = projects.map((p: any) => ({
        ...p,
        category: category
      }));
      allProjects = [...allProjects, ...projectsWithCategory];
    }
  });

  return allProjects;
}

export function getAllSlugs(): string[] {
  const data = getAllProjectData();
  return data.filter((item) => !item.external).map((item) => item.url);
}

export async function getProject(category: string, slug: string): Promise<MaybeContent<Project>> {
  return getMdxContent<Project>(`projects/${category}`, `${slug}.mdx`);
}
