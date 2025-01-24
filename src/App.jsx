import { useState, useEffect, useRef } from 'react'
import Blog from './components/ui/Blog'
import { useSelector, useDispatch } from 'react-redux'
import {
    addBlogFn,
    getAllBlogs,
    updateBlogDetails,
    sortBlogs,
    deleteBlog,
} from './store/blogs/blogSlice'
import { BlogsContainer } from './styles/home/blogsStyles'
import { Button, Grid2, Typography } from '@mui/material'
import { Add, Sort } from '@mui/icons-material'
import BlogFormModel from './components/ui/BlogForm'

const App = () => {
    const dispatch = useDispatch()

    const blogs = useSelector((state) => state.blog.blogs)
    const user = useSelector((state) => state.user)

    const blogFormRef = useRef()

    const handleSortBlogs = () => {
        dispatch(sortBlogs())
    }

    const deleteBlogFn = async (blog) => {
        try {
            dispatch(deleteBlog(user.token, blog))
        } catch (e) {
            console.log(e)
        }
    }

    const likeBlog = async (blog) => {
        try {
            dispatch(updateBlogDetails(user.token, blog))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (user) {
            dispatch(getAllBlogs(user.token))
        }
    }, [user])

    return (
        <BlogsContainer>
            <Grid2
                container
                spacing={2}
                sx={{
                    padding: '10px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Grid2
                    size={{ md: 7, xs: 12 }}
                    sx={{
                        display: 'flex',
                        alignItems: 'start',
                        alignSelf: 'flex-start',
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{ fontWeight: 'bold' }}
                        color="primary"
                    >
                        Blogs
                    </Typography>
                </Grid2>
                <Grid2
                    size={{ xs: 12, md: 3 }}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Button onClick={handleSortBlogs}>
                        <Sort /> Sort by likes
                    </Button>
                    <BlogFormModel />
                    {/* <BlogForm addBlog={addBlog} /> */}
                </Grid2>
            </Grid2>
            <div>
                <Grid2 container>
                    {blogs?.map((blog) => (
                        <Grid2 key={blog.id} size={{ xs: 12, md: 6, lg: 4 }}>
                            <Blog
                                key={blog.id}
                                blog={blog}
                                likeBlog={likeBlog}
                                deleteBlog={deleteBlogFn}
                            />
                        </Grid2>
                    ))}
                </Grid2>
            </div>
        </BlogsContainer>
    )
}
export default App
