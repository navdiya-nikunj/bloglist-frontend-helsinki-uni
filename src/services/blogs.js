import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async (token) => {
  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const addBlog = async (token, blog) => {
  try {
    const res = await axios.post(baseUrl, blog, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

const addLike = async (token, blog) => {
  try {
    const res = await axios.put(`${baseUrl}/${blog.id}`, blog, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

const deleteBlog = async (token, blogid) => {
  try {
    const res = await axios.delete(`${baseUrl}/${blogid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

const getBlog = async (token, blogId) => {
  try {
    const res = await axios.get(baseUrl + "/" + blogId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(res);
    return res.data;
  }
  catch (e) {
    console.log(e);
  }
}

export default { getAll, addBlog, addLike, deleteBlog, getBlog };
