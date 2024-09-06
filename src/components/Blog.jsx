import axios from "axios";
import Toggable from "./Toggable";

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const addLike = async () => {
    await likeBlog({ ...blog, likes: blog.likes + 1 });
  };
  const handleDelete = async () => {
    await deleteBlog(blog);
  };
  return (
    <div>
      {blog.title}
      <Toggable buttonLabel={"View"} cancelButton={"hide"}>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes}</p>
        <button onClick={addLike}>Like</button>
        <p>{blog.author}</p>
        <button onClick={handleDelete}>Delete</button>
      </Toggable>
    </div>
  );
};

export default Blog;
