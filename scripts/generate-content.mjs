import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import fs from "fs";

async function writing() {
  const metadata = [];
  const basePath = path.join(process.cwd(), "content", "writing");

  const external = JSON.parse(
    fs.readFileSync(path.join(basePath, "external.json"), "utf8")
  ).map((item) => ({ ...item, external: true }));
  const postPaths = fs.readdirSync(basePath, "utf8");
  const posts = await Promise.all(
    postPaths
      .filter((fileName) => fileName.includes(".mdx"))
      .map(async (fileName) => {
        const contentPath = path.join(basePath, fileName);
        const fileContents = fs.readFileSync(contentPath, "utf8");
        const source = await serialize(fileContents, {
          parseFrontmatter: true,
          mdxOptions: { development: false },
        });

        return {
          ...source.frontmatter,
          url: "/" + path.join("writing", fileName.split(".")[0]),
          external: false,
        };
      })
  );

  metadata.push(...posts);
  metadata.push(...external);
  metadata.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  fs.writeFileSync(
    path.join(basePath, "index.json"),
    JSON.stringify(metadata, undefined, 2)
  );
}

async function projects() {
  const projectsRoot = path.join(process.cwd(), "content", "projects");
  if (!fs.existsSync(projectsRoot)) return;

  const categories = fs.readdirSync(projectsRoot).filter(file => 
    fs.statSync(path.join(projectsRoot, file)).isDirectory()
  );

  for (const category of categories) {
    const metadata = [];
    const basePath = path.join(projectsRoot, category);
    const externalPath = path.join(basePath, "external.json");

    const external = fs.existsSync(externalPath) 
      ? JSON.parse(fs.readFileSync(externalPath, "utf8")).map((item) => ({ ...item, external: true, category }))
      : [];

    const postPaths = fs.readdirSync(basePath, "utf8");
    const posts = await Promise.all(
      postPaths
        .filter((fileName) => fileName.includes(".mdx"))
        .map(async (fileName) => {
          const contentPath = path.join(basePath, fileName);
          const fileContents = fs.readFileSync(contentPath, "utf8");
          const source = await serialize(fileContents, {
            parseFrontmatter: true,
            mdxOptions: { development: false },
          });

          return {
            ...source.frontmatter,
            url: "/" + path.join("projects", category, fileName.split(".")[0]),
            external: false,
            category
          };
        })
    );

    metadata.push(...posts);
    metadata.push(...external);
    metadata.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    fs.writeFileSync(
      path.join(basePath, "index.json"),
      JSON.stringify(metadata, undefined, 2)
    );
  }
}

async function main() {
  await writing();
  await projects();
}

main();