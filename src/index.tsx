import { serve } from "bun";
import { loadArticles } from "./articles";
import index from "./index.html";

const articles = await loadArticles();

const server = serve({
  routes: {
    "/articles.json": () => Response.json(articles),
    "/*": index,
  },
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`Server running at ${server.url}`);
