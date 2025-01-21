import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Toggable from "./components/Toggable";
import BlogForm from "./components/BlogForm";
import { useSelector, useDispatch } from "react-redux";
import { removeNotification, showNotification } from "./store/notification/notificationSlice";
import { addBlogFn, getAllBlogs, sortBlogs } from "./store/blogs/blogSlice";
import { loginUser, logout, setuser } from "./store/user/userSlice";



const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const notification = useSelector(state=> state.notification);
  const blogs = useSelector(state=> state.blog.blogs);
  const user = useSelector(state => state.user);


  const blogFormRef = useRef();
 

  useEffect(() => {
    const localstorageuser = localStorage.getItem("User");
    if (localstorageuser) {
      dispatch(setuser(JSON.parse(localstorageuser)));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(username, password));
    } catch (e) {
      console.log(e);
      dispatch(showNotification({
        msg: "wrong username or password",
        color: 'red'
      }));
    }
  };

  const handleSortBlogs = () => {
    dispatch(sortBlogs());
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  const deleteBlog = async (blog) => {
    try {
     dispatch(deleteBlog(user.token, blog));
      
    } catch (e) {
      console.log(e);
    }
  };
  const addBlog = async (blog) => {
    try {
      dispatch(addBlogFn(user.token, blog));
      blogFormRef.current.toggleButton();
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

  const likeBlog = async (blog) => {
    try {
       await blogService.addLike(user.token, blog);
       dispatch(getAllBlogs(user.token));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if(notification?.msg){
      console.log(notification);
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    }
  }, [notification]);

  useEffect(() => {
    console.log(user);
    if (user) {
      dispatch(getAllBlogs(user.token));
    }
  }, [user]);

  return (
    <>
      {notification?.msg && (
        <div
          className="error"
          style={{
            padding: 5,
            border: `1px solid ${notification.color}`,
            backgroundColor: "gray",
          }}
        >
          <p style={{ color: `${notification.color}` }}>
            {notification.msg}
          </p>
        </div>
      )}
      {!user ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="loginform"
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "30%",
              height: "30%",
              justifyContent: "space-around",
              border: "1px solid black",
              padding: 10,
            }}
          >
            <label htmlFor="Username">Username:</label>
            <input
              type="text"
              name="Username"
              data-testid="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label htmlFor="Password">Password:</label>
            <input
              data-testid="password"
              type="password"
              name="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <h2 style={{ textAlign: "center" }}>Blogs</h2>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <p style={{ textAlign: "center" }}>{user.name} is logged in </p>
            <button onClick={handleLogOut}>Logout</button>
          </div>
          <Toggable
            buttonLabel={"Add Blog"}
            cancelButton={"Cancel"}
            ref={blogFormRef}
          >
            <BlogForm addBlog={addBlog} />
          </Toggable>
          <button onClick={handleSortBlogs}>Sort by likes</button>
          <ol>
            {blogs?.map((blog) => (
              <div
                key={blog.id}
                style={{ border: "1px solid black", marginBottom: 10 }}
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
      )}
    </>
  );
};
export default App;
