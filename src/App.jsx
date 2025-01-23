import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'
import { useSelector, useDispatch } from 'react-redux'
import {
    addBlogFn,
    getAllBlogs,
    LikeBlog,
    sortBlogs,
} from './store/blogs/blogSlice'

const App = () => {
    const dispatch = useDispatch()

    const blogs = useSelector((state) => state.blog.blogs)
    const user = useSelector((state) => state.user)

    const blogFormRef = useRef()

    const handleSortBlogs = () => {
        dispatch(sortBlogs())
    }

    const deleteBlog = async (blog) => {
        try {
            dispatch(deleteBlog(user.token, blog))
        } catch (e) {
            console.log(e)
        }
    }
    const addBlog = async (blog) => {
        try {
            dispatch(addBlogFn(user.token, blog))
            blogFormRef.current.toggleButton()
        } catch (e) {
            alert(e)
            console.log(e)
        }
    }

    const likeBlog = async (blog) => {
        try {
            dispatch(LikeBlog(user.token, blog))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        console.log(user)
        if (user) {
            dispatch(getAllBlogs(user.token))
        }
    }, [user])

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Blogs</h2>
            <div>
                <Toggable
                    buttonLabel={'Add Blog'}
                    cancelButton={'Cancel'}
                    ref={blogFormRef}
                >
                    <BlogForm addBlog={addBlog} />
                </Toggable>
                <button onClick={handleSortBlogs}>Sort by likes</button>
                <ol>
                    {blogs?.map((blog) => (
                        <div
                            key={blog.id}
                            style={{
                                border: '1px solid black',
                                marginBottom: 10,
                            }}
                        >
                            <li>
                                <Blog
                                    key={blog.id}
                                    blog={blog}
                                    likeBlog={likeBlog}
                                    deleteBlog={deleteBlog}
                                />
                            </li>
                        </div>
                    ))}
                </ol>
            </div>
        </>
    )
}
export default App
