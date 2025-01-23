import axios from 'axios'
import Toggable from './Toggable'
import { NavLink } from 'react-router'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
    const addLike = async () => {
        await likeBlog({ ...blog, likes: blog.likes + 1 })
    }
    const handleDelete = async () => {
        await deleteBlog(blog)
    }
    return (
        <div className="blog">
            <NavLink to={`/blogs/${blog.id}`}>{blog.title}</NavLink> by
            {blog.author}
            <Toggable
                buttonLabel={'View'}
                cancelButton={'hide'}
                data-testid="toggable"
            >
                <p className="url">{blog.url}</p>
                <p className="likes">Likes: {blog.likes}</p>
                <button onClick={addLike} className="likebutton">
                    Like
                </button>
                <p>{blog.author}</p>
                <button onClick={handleDelete}>Delete</button>
            </Toggable>
        </div>
    )
}

export default Blog
