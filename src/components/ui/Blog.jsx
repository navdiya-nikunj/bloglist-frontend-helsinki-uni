import axios from 'axios'

import { NavLink, useNavigate } from 'react-router'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material'
import { Delete, Link, ThumbUpSharp } from '@mui/icons-material'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
    const addLike = async () => {
        await likeBlog({ ...blog, likes: blog.likes + 1 })
    }
    const handleDelete = () => {
        deleteBlog(blog)
    }
    const nav = useNavigate()
    const viewBlog = () => {
        nav(`/blogs/${blog.id}`)
    }
    return (
        <Card sx={{ minWidth: 275, margin: '1.5rem' }}>
            <CardContent sx={{ paddingBottom: 0 }}>
                <Typography
                    gutterBottom
                    sx={{ color: 'text.secondary', fontSize: 14 }}
                >
                    By {blog.author}
                </Typography>
                <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
                    {blog?.title}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={viewBlog}>View</Button>
                <Button onClick={addLike}>
                    <ThumbUpSharp style={{ marginRight: '5px' }} /> {blog.likes}
                </Button>
                <Button onClick={handleDelete} sx={{ color: 'red' }}>
                    <Delete style={{ marginRight: '5px' }} /> Delete
                </Button>
                <Button
                    onClick={() => {
                        const url = blog.url.startsWith('http')
                            ? blog.url
                            : `https://${blog.url}`
                        window.open(url, '_blank', 'noopener,noreferrer')
                    }}
                >
                    <Link />
                </Button>
            </CardActions>
        </Card>
        // <div className="blog">
        //     <NavLink to={`/blogs/${blog.id}`}>{blog.title}</NavLink> by

        //     <Toggable
        //         buttonLabel={'View'}
        //         cancelButton={'hide'}
        //         data-testid="toggable"
        //     >
        //         <p className="url">{blog.url}</p>
        //         <p className="likes">Likes: {blog.likes}</p>
        //         <button onClick={addLike} className="likebutton">
        //             Like
        //         </button>
        //         <p>{blog.author}</p>
        //         <button onClick={handleDelete}>Delete</button>
        //     </Toggable>
        // </div>
    )
}

export default Blog
