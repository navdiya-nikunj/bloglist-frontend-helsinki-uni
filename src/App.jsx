import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import { login } from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getblogs = async () => {
      const blogs = await blogService.getAll(user.token);
      console.log(blogs);
      setBlogs(blogs);
    };
    if (user) {
      console.log("User", user);
      getblogs();
    }
  }, [user]);

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
      <h3 style={{ textAlign: "center" }}>{user.name} is logged in</h3>
      <ol>
        {blogs.map((blog) => (
          <li>
            <Blog key={blog.id} blog={blog} />
          </li>
        ))}
      </ol>
    </div>
  );
};
export default App;
