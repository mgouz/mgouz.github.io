import { serve } from "bun";
import { readdir } from "fs/promises";
import path from "path";
import index from "./index.html";

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx > 0) meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { meta, content: match[2].trim() };
}

const articlesDir = path.join(import.meta.dir, "articles");

const server = serve({
  routes: {
    "/api/articles": async () => {
      const files = await readdir(articlesDir);
      const articles = await Promise.all(
        files
          .filter((f) => f.endsWith(".md"))
          .map(async (f) => {
            const raw = await Bun.file(path.join(articlesDir, f)).text();
            const { meta } = parseFrontmatter(raw);
            return {
              slug: f.replace(/\.md$/, ""),
              title: meta.title ?? "",
              date: meta.date ?? "",
              blurb: meta.blurb ?? "",
            };
          })
      );
      articles.sort((a, b) => b.date.localeCompare(a.date));
      return Response.json(articles);
    },

    "/api/articles/:slug": async (req) => {
      const file = Bun.file(path.join(articlesDir, `${req.params.slug}.md`));
      if (!(await file.exists())) {
        return new Response("Not found", { status: 404 });
      }
      const raw = await file.text();
      const { meta, content } = parseFrontmatter(raw);
      return Response.json({
        slug: req.params.slug,
        title: meta.title ?? "",
        date: meta.date ?? "",
        content,
      });
    },

    "/*": index,
  },
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`Server running at ${server.url}`);
