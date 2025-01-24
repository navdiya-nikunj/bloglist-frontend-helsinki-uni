import { Add, Height } from '@mui/icons-material'
import { Box, Button, Modal, TextField } from '@mui/material'
import { useState } from 'react'
import { BlogForm } from '../../styles/home/blogFormStyles'
import { useDispatch, useSelector } from 'react-redux'
import { addBlogFn } from '../../store/blogs/blogSlice'

const BlogFormModel = () => {
    const [blog, setBlog] = useState({
        title: '',
        author: '',
        url: '',
    })
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    const handleAddBlog = async (event) => {
        event.preventDefault()
        try {
            dispatch(addBlogFn(user?.token, blog))
            handleClose()
            setBlog({
                title: '',
                author: '',
                url: '',
            })
        } catch (e) {
            alert(e)
            setBlog({
                title: '',
                author: '',
                url: '',
            })
            handleClose()
        }
    }

    return (
        <>
            <Button className="toggleButton" onClick={handleOpen}>
                <Add /> Add Blog{' '}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <BlogForm onSubmit={handleAddBlog} data-testid="blogform">
                        <TextField
                            variant="filled"
                            label="Title"
                            type="text"
                            name="Title"
                            placeholder="Title of blog"
                            value={blog.title}
                            data-testid="blogTitle"
                            onChange={(e) => {
                                setBlog({ ...blog, title: e.target.value })
                            }}
                        />
                        <TextField
                            variant="filled"
                            label="Author"
                            type="text"
                            data-testid="blogAuthor"
                            placeholder="Author of blog"
                            name="Author"
                            value={blog.author}
                            onChange={(e) => {
                                setBlog({ ...blog, author: e.target.value })
                            }}
                        />
                        <TextField
                            variant="filled"
                            label="URL:"
                            type="text"
                            name="URL"
                            placeholder="URL of blog"
                            data-testid="blogURL"
                            value={blog.url}
                            onChange={(e) => {
                                setBlog({ ...blog, url: e.target.value })
                            }}
                        />
                        <Button type="submit" variant="contained">
                            Create
                        </Button>
                    </BlogForm>
                </Box>
            </Modal>
        </>
    )
}

export default BlogFormModel
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
    height: '40%',
}
