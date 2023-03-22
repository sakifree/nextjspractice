import { getBlog, getBlogs } from "@/utils/actions"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const Show = ({blog}) => {

    // console.log(blog)
    console.log(blog.title)
    console.log(blog.body)
    const router = useRouter()

    const [form, setForm] = useState({
        "title": `${blog.title}`,
        "body": `${blog.body}`
    })

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleUpdate = async (event) => {
        event.preventDefault()
        await fetch(`/api/blog/${blog._id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        router.reload(window.location.pathname)
    }

    const handleDelete = async (event) => {
        event.preventDefault()
        await fetch(`/api/blog/${blog._id}`, {
            method: "delete"
        })
        router.push("/")
    }

    return (
        <div>
            <Link href="/"><button>Home</button></Link>
            <h1>{blog.title} Page</h1>
            <p>{blog.body}</p>
            <form onSubmit={handleUpdate}>
                <input defaultValue={blog.title} type="text" name="title" onChange={handleChange} />
                <input defaultValue={blog.body} type="text" name="body" onChange={handleChange} />
                <input type="submit" value={`Update ${blog.title}`} />
            </form>
            <form onSubmit={handleDelete}>
                <input type="submit" value={`Delete ${blog.title}`} /> 
            </form>
        </div>
        
    )
}

export async function getStaticPaths(){
    const blogs = await getBlogs()
    //console.log(blogs)

    return {
        paths: blogs.map(({ id }) => ({
            params: { id },
        })),
        fallback: false
    }
    
}

export async function getStaticProps(context){
    const { params } = context
    const id = params.id
    const blog = JSON.parse(JSON.stringify(await getBlog(id)))
    console.log(blog)
    return {
        props: {
            blog
        }
    }
}

// export async function getServerSideProps(context){
//     //console.log(context.query.id)
//     const id = context.query.id
//     const blog = JSON.parse(JSON.stringify(await getBlog(id)))
//     //console.log(blog)

//     return {
//         props: {
//             blog
//         }
//     }
// }

export default Show