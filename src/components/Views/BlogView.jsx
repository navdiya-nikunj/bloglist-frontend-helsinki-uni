import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import blogs from '../../services/blogs'
import { getAllBlogs } from '../../store/blogs/blogSlice'
import {
    Box,
    Button,
    Container,
    Modal,
    TextField,
    Typography,
} from '@mui/material'
import { Chat, Comment, Link, ThumbUpSharp } from '@mui/icons-material'

const BlogView = () => {
    const [blog, setBlog] = useState(null)
    const [comment, setComment] = useState('')
    const user = useSelector((state) => state.user)
    const { blogId } = useParams()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

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
            <Container
                sx={{
                    marginTop: '20px',
                    backgroundColor: 'whitesmoke',
                    boxShadow: '5px 5px 5px',
                    padding: '10px',
                }}
            >
                <Container
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <Typography
                            component={'animate'}
                            variant="h2"
                            color="primary"
                        >
                            {blog?.title}
                        </Typography>
                        <Typography component={'blockquote'}>
                            By {blog?.author}
                        </Typography>
                    </div>
                    <div>
                        <Button onClick={handleLike}>
                            <ThumbUpSharp style={{ marginRight: '5px' }} />{' '}
                            {blog.likes}
                        </Button>
                        <Button
                            onClick={() => {
                                const url = blog.url.startsWith('http')
                                    ? blog.url
                                    : `https://${blog.url}`
                                window.open(
                                    url,
                                    '_blank',
                                    'noopener,noreferrer'
                                )
                            }}
                        >
                            <Link />
                        </Button>
                        <Button onClick={handleOpen}>
                            <Comment />
                        </Button>
                    </div>
                </Container>
                {blog?.comments?.length !== 0 && (
                    <Container
                        sx={{
                            borderTop: '1px solid gray',
                            margin: '10px 0px',
                            padding: '5px',
                        }}
                    >
                        <Typography component={'h2'} variant="h5">
                            Commnets
                        </Typography>
                        <ul>
                            {blog?.comments.map((comment, idx) => (
                                <li key={idx}>{comment}</li>
                            ))}
                        </ul>
                    </Container>
                )}
                <Modal open={open} onClose={handleClose}>
                    <Box sx={style}>
                        <form
                            onSubmit={handleSumitComment}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                            }}
                        >
                            <TextField
                                variant="filled"
                                label="Comment"
                                type="text"
                                onChange={handleInputChange}
                                name="comment"
                                value={comment}
                            />

                            <Button
                                variant="contained"
                                type="submit"
                                disabled={!comment}
                            >
                                {' '}
                                Submit{' '}
                            </Button>
                        </form>
                    </Box>
                </Modal>
                {/* <p>Commnets</p>
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
                        
                    </>
                )} */}
            </Container>
        )
    )
}
export default BlogView

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}
