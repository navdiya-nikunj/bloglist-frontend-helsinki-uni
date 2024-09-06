import axios from "axios";
import Toggable from "./Toggable";

const Blog = ({ blog, likeBlog }) => {
  const addLike = async () => {
    await likeBlog({ ...blog, likes: blog.likes + 1 });
  };

  return (
    <div>
      {blog.title}
      <Toggable buttonLabel={"View"} cancelButton={"hide"}>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes}</p>
        <button onClick={addLike}>Like</button>
        <p>{blog.author}</p>
      </Toggable>
    </div>
  );
};

export default Blog;
