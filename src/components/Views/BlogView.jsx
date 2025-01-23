import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router'
import blogs from '../../services/blogs'
import { getAllBlogs } from '../../store/blogs/blogSlice'

const BlogView = () => {
    const [blog, setBlog] = useState(null)
    const [comment, setComment] = useState('')
    const user = useSelector((state) => state.user)
    const { blogId } = useParams()
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        setComment(e.target.value)
    }

    const handleSumitComment = async (e) => {
        e.preventDefault()
        if (comment) {
            const res = await blogs.updateBlog(user.token, {
                ...blog,
                comments: [...blog.comments, comment],
            })
            setBlog(res)
            setComment('')
        }
    }

    const handleLike = async () => {
        const res = await blogs.updateBlog(user.token, {
            ...blog,
            likes: blog.likes + 1,
        })
        setBlog(res)
    }

    useEffect(() => {
        if (user) {
            blogs.getBlog(user.token, blogId).then((res) => setBlog(res))
        }
    }, [])

    return (
        blog && (
            <>
                <h1>{blog?.title}</h1>
                <Link to={blog?.url}>{blog?.url}</Link>
                <p>Likes: {blog?.likes}</p>
                <button onClick={handleLike}>Like</button>
                <p>By {blog?.author}</p>
                <p>Commnets</p>
                <form onSubmit={handleSumitComment}>
                    <input
                        type="text"
                        onChange={handleInputChange}
                        name="comment"
                        value={comment}
                    />
                    <button type="submit" disabled={!comment}>
                        {' '}
                        Submit{' '}
                    </button>
                </form>
                {blog?.comments.length !== 0 && (
                    <>
                        <ul>
                            {blog?.comments.map((comment, idx) => (
                                <li key={idx}>{comment}</li>
                            ))}
                        </ul>
                    </>
                )}
            </>
        )
    )
}
export default BlogView
