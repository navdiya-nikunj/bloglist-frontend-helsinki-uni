import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import { login } from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const getblogs = async () => {
    const blogs = await blogService.getAll(user.token);
    console.log(blogs);
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
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("User");
    setUser(null);
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    try {
      const addedBlog = await blogService.addBlog(user.token, blog);
      console.log(addedBlog);
      await getblogs();
      setBlog({
        title: "",
        author: "",
        url: "",
      });
    } catch (e) {
      alert(e);
      setBlog({
        title: "",
        author: "",
        url: "",
      });
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User", user);
      getblogs();
    }
  }, [user]);

  return !user ? (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
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
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="Password">Password:</label>
        <input
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
      <div style={{ marginTop: 20, marginBottom: "20" }}>
        <form
          onSubmit={handleAddBlog}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            height: "25vh",
            justifyContent: "space-around",
            border: "1px solid black",
            padding: 10,
          }}
        >
          <label htmlFor="Title">Title:</label>
          <input
            type="text"
            name="Title"
            value={blog.title}
            onChange={(e) => {
              setBlog({ ...blog, title: e.target.value });
            }}
          />
          <label htmlFor="Author">Author:</label>
          <input
            type="text"
            name="Author"
            value={blog.author}
            onChange={(e) => {
              setBlog({ ...blog, author: e.target.value });
            }}
          />
          <label htmlFor="URL">URL:</label>
          <input
            type="text"
            name="URL"
            value={blog.url}
            onChange={(e) => {
              setBlog({ ...blog, url: e.target.value });
            }}
          />
          <button type="submit">Create</button>
        </form>
      </div>
      <ol>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Blog key={blog.id} blog={blog} />
          </li>
        ))}
      </ol>
    </div>
  );
};
export default App;
