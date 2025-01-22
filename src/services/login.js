import axios from "axios";
const baseUrl = "/api/login";

const login = async (username, password) => {
  const res = await axios.post(baseUrl, { username, password });
  localStorage.setItem("User", JSON.stringify(res.data));
  return res.data;
};

const logOut = async () => {
  localStorage.removeItem("User");
}


export default { login, logOut };
