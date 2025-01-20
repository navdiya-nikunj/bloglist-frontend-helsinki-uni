import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import { login } from "./services/login";
import Toggable from "./components/Toggable";
import BlogForm from "./components/BlogForm";
import { useSelector, useDispatch } from "react-redux";
import { removeNotification, showNotification } from "./store/notification/notificationSlice";


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const notification = useSelector(state=> state.notification);


  const blogFormRef = useRef();
  const getblogs = async () => {
    const blogs = await blogService.getAll(user.token);
    setBlogs(blogs);
  };

  useEffect(() => {
    const localstorageuser = localStorage.getItem("User");
    if (localstorageuser) {
      setUser(JSON.parse(localstorageuser));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(username, password);
      setUser(user);
      console.log(user);
    } catch (e) {
      console.log(e);
      dispatch(showNotification({
        msg: "wrong username or password",
        color: 'red'
      }));
    }
  };

  const sortBlogs = () => {
    console.log("hello");
    console.log("Og", blogs);
    const sortedBlogs = [...blogs].sort((blog1, blog2) => {
      if (blog1.likes > blog2.likes) {
        return -1;
      } else if (blog1.likes < blog2.likes) {
        return 1;
      }
      return 0;
    });
    console.log(sortedBlogs);
    setBlogs(sortedBlogs);
  };

  const handleLogOut = () => {
    localStorage.removeItem("User");
    setUser(null);
  };

  const deleteBlog = async (blog) => {
    try {
      await blogService.deleteBlog(user.token, blog.id);
      await getblogs();
      // console.log(deletedBlog);
      dispatch(showNotification({
        msg: `${blog.title} by ${blog.author} is deleted`,
        color: "red"
      }))
      
    } catch (e) {
      console.log(e);
    }
  };
  const addBlog = async (blog) => {
    try {
      const addedBlog = await blogService.addBlog(user.token, blog);
      console.log(addedBlog);
      blogFormRef.current.toggleButton();
      await getblogs();
      dispatch(showNotification({
        msg:`${addedBlog.title} by ${addedBlog.author} is added`,
        color: "green",
      }))
      
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

  const likeBlog = async (blog) => {
    try {
      await blogService.addLike(user.token, blog);
      await getblogs();
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
    if (user) {
      console.log("User", user);
      getblogs();
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
          <button onClick={sortBlogs}>Sort by likes</button>
          <ol>
            {blogs.map((blog) => (
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
