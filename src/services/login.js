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

const getusers = async () => {
  const res = await axios.get("/api/users");
  console.log(res.data);
  return res.data;
}

export default { login, logOut, getusers };
