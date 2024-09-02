import axios from "axios";
const baseUrl = '/api/login'

const login = async (username, password) => {
    const res = await axios.post(baseUrl, { username, password });
    console.log("res", res);
    return res.data;
}

export { login };