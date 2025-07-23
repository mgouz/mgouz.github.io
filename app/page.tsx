import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        About me
      </h1>
      <p className="mb-4">
        I'm a software engineer with professional experience in building full stack web applications and constructing fast data pipelines. My personal passions for development lie in lower level stuff like operating systems and compiler design.  I've recently read and loved <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href='https://pages.cs.wisc.edu/~remzi/OSTEP'>OSTEP</a> and am working on finishing a simple OS with the help of <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="project">OSDev</a> in the next couple of months.
      </p>
      <div className="my-8">
        <BlogPosts limit={3} />
      </div>
    </section>
  )
}
