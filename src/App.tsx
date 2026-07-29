import "./index.css";

const articles = [
  {
    title: "On the Nature of Attention",
    date: "2026-07-20",
    blurb:
      "What does it mean to pay attention in an age of infinite distraction? I've been thinking about this through the lens of Simone Weil, who believed attention was the rarest form of generosity.",
  },
  {
    title: "Cathedral Thinking",
    date: "2026-06-15",
    blurb:
      "The builders of medieval cathedrals knew they would never see the finished work. There's something in that disposition worth recovering — especially in how we build software.",
  },
  {
    title: "Notes on Icons and Interfaces",
    date: "2026-05-28",
    blurb:
      "The Orthodox icon tradition has a theory of images that feels surprisingly relevant to interaction design. An icon is not a picture of something — it's a window into something.",
  },
];

export function App() {
  return (
    <div className="site">
      <aside className="sidebar">
        <div className="sidebar-content">
          <h1 className="site-title">matthew's blog</h1>
          <p className="bio">
            interested in tech, philosophy, art, and religion. I write about some of it here.
          </p>
          <nav className="links">
            <a href="https://github.com/mgouz" target="_blank" rel="noopener noreferrer">
              github
            </a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer">
              linkedin
            </a>
            <a href="mailto:matt@example.com">email</a>
          </nav>
        </div>
      </aside>
      <main className="content">
        {articles.map((article) => (
          <article key={article.title} className="entry">
            <time className="entry-date">{article.date}</time>
            <h2 className="entry-title">{article.title}</h2>
            <p className="entry-blurb">{article.blurb}</p>
          </article>
        ))}
      </main>
    </div>
  );
}

export default App;
