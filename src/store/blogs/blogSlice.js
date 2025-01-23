import { createSlice } from "@reduxjs/toolkit";
import blogService from '../../services/blogs';
import { showNotification } from "../notification/notificationSlice";
import blogs from "../../services/blogs";


const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        blogs: []
    },
    reducers: {
        setBlogs(state, action) {
            return { blogs: action.payload };
        },
        addBlog(state, action) {
            return { blogs: [...state.blogs, action.payload] };
        },
        removeBlog(state, action) {
            return {
                blogs: state.blogs.filter(blog => blog.id == action.payload.id)
            };
        },
        sortBlogs(state, action) {
            return {
                blogs: [...state.blogs].sort((blog1, blog2) => {
                    if (blog1.likes > blog2.likes) {
                        return -1;
                    } else if (blog1.likes < blog2.likes) {
                        return 1;
                    }
                    return 0;
                })
            }
        },
        updateBlog(state, action) {
            return {
                blogs: state.blogs.map((blog) => {
                    if (blog.id == action.payload.id) {
                        return action.payload;
                    }
                    return blog;
                })
            }

        }
    }
})

export default blogSlice.reducer;
export const { setBlogs, addBlog, removeBlog, sortBlogs, updateBlog } = blogSlice.actions;


export const getAllBlogs = (token) => {
    return async dispatch => {
        const blogs = await blogService.getAll(token);
        dispatch(setBlogs(blogs));
    }
}

export const addBlogFn = (token, blog) => {
    return async dispatch => {
        const res = await blogService.addBlog(token, blog);
        dispatch(addBlog(res));
        dispatch(showNotification({
            msg: `${res.title} by ${res.author} is added`,
            color: "green",
        }))
    }
}

export const deleteBlog = (token, blog) => {
    return async dispatch => {
        const res = await blogService.deleteBlog(token, blog);
        dispatch(removeBlog(res));
        dispatch(showNotification({
            msg: `${res.title} by ${res.author} is deleted`,
            color: "red"
        }))
    }
}

export const LikeBlog = (token, blog) => {
    return async dispatch => {
        const res = await blogService.addLike(token, blog);
        dispatch(updateBlog(res));
    }
}