import { BlogPosts } from 'app/components/posts'
import { Link } from 'app/components/link'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        About me
      </h1>
      <div className="mb-4">
        I'm a software engineer with professional experience in building full stack web applications and constructing fast data pipelines. My personal passions for development lie in lower level stuff like operating systems and compiler design.  I've recently read and loved <Link target="_blank" href='https://pages.cs.wisc.edu/~remzi/OSTEP'>OSTEP</Link> and am working on finishing a simple OS with the help of <Link target="_blank" href="https://wiki.osdev.org/Expanded_Main_Page">OSDev</Link> in the next couple of months.
      </div>
      <div className="my-8">
        <BlogPosts limit={3} />
      </div>
    </section>
  )
}
