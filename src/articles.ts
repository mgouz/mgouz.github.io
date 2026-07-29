import { readdir } from "fs/promises";
import path from "path";

export type Article = {
  slug: string;
  title: string;
  date: string;
  blurb: string;
  content: string;
};

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {} as Record<string, string>, content: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx > 0) meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { meta, content: match[2].trim() };
}

export async function loadArticles(): Promise<Article[]> {
  const dir = path.join(import.meta.dir, "articles");
  const files = await readdir(dir);
  const articles = await Promise.all(
    files
      .filter((f) => f.endsWith(".md"))
      .map(async (f) => {
        const raw = await Bun.file(path.join(dir, f)).text();
        const { meta, content } = parseFrontmatter(raw);
        return {
          slug: f.replace(/\.md$/, ""),
          title: meta.title ?? "",
          date: meta.date ?? "",
          blurb: meta.blurb ?? "",
          content,
        };
      })
  );
  return articles.sort((a, b) => b.date.localeCompare(a.date));
}
