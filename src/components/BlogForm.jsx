import { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleAddBlog = async (event) => {
    event.preventDefault();
    try {
      await addBlog(blog);
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

  return (
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
  );
};

export default BlogForm;
