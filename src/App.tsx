import { useState, useEffect } from "react";
import { marked } from "marked";
import "./index.css";

import type { Article } from "./articles";

declare global {
  var __ARTICLES__: Article[];
}

function ArticleList({
  articles,
  onSelect,
}: {
  articles: Article[];
  onSelect: (slug: string) => void;
}) {
  return (
    <main className="content">
      {articles.map((a) => (
        <article
          key={a.slug}
          className="entry"
          onClick={() => onSelect(a.slug)}
        >
          <time className="entry-date">{a.date}</time>
          <h2 className="entry-title">{a.title}</h2>
          <p className="entry-blurb">{a.blurb}</p>
        </article>
      ))}
    </main>
  );
}

function ArticleView({
  article,
  onBack,
}: {
  article: Article;
  onBack: () => void;
}) {
  const html = marked.parse(article.content) as string;

  return (
    <main className="content">
      <button className="back-link" onClick={onBack}>
        &larr; back
      </button>
      <article className="article-full">
        <time className="entry-date">{article.date}</time>
        <h1 className="article-title">{article.title}</h1>
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </main>
  );
}

export function App() {
  const [articles, setArticles] = useState<Article[]>(
    globalThis.__ARTICLES__ ?? []
  );

  useEffect(() => {
    if (!globalThis.__ARTICLES__) {
      fetch("/articles.json")
        .then((r) => r.json())
        .then(setArticles);
    }
  }, []);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    const onPopState = () => {
      const slug = location.hash.replace("#/", "") || null;
      setActiveSlug(slug);
    };
    window.addEventListener("popstate", onPopState);
    onPopState();
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const openArticle = (slug: string) => {
    history.pushState(null, "", `#/${slug}`);
    setActiveSlug(slug);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    history.pushState(null, "", location.pathname);
    setActiveSlug(null);
    window.scrollTo(0, 0);
  };

  const active = activeSlug
    ? articles.find((a) => a.slug === activeSlug) ?? null
    : null;

  return (
    <div className="site">
      <aside className="sidebar">
        <div className="sidebar-content">
          <h1 className="site-title">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                goBack();
              }}
            >
              matthew's blog
            </a>
          </h1>
          <p className="bio">
            interested in tech, philosophy, art, and religion. I write about
            some of it here.
          </p>
          <nav className="links">
            <a
              href="https://github.com/mgouz"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
            <a
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin
            </a>
            <a href="mailto:matt@example.com">email</a>
          </nav>
        </div>
      </aside>
      {active ? (
        <ArticleView article={active} onBack={goBack} />
      ) : (
        <ArticleList articles={articles} onSelect={openArticle} />
      )}
    </div>
  );
}

export default App;
