import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (token) => {
  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data;
}

const addBlog = async (token, blog) => {
  try {
    const res = await axios.post(baseUrl, blog, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export default { getAll, addBlog }