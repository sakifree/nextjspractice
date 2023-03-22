import { getBlogs } from '@/utils/actions'
import Link from 'next/link'

export default function Home({blogs}) {

  console.log(blogs)
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <Link href={`/${encodeURIComponent(blog._id)}`}>
            <h1>{blog.title}</h1>
          </Link>
          <p>{blog.body}</p>
        </div>
      ))}
      <Link href="/new"><button>New Blog</button></Link>
    </div>
  )
}

// use getServerSideProps when you know that data will need to be refreshed on every request
export async function getServerSideProps(context){
  const blogs = JSON.parse(JSON.stringify(await getBlogs()))
  return {
    props: {
      blogs
    }
  }
}
