import Toggable from "./Toggable";

const Blog = ({ blog }) => (
  <div>
    {blog.title}
    <Toggable buttonLabel={"View"} cancelButton={"hide"}>
      <p>{blog.url}</p>
      <p>{blog.likes}</p>
      <p>{blog.author}</p>
    </Toggable>
  </div>
);

export default Blog;
