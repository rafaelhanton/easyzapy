import axios from "axios";

console.log(process.env.REACT_APP_BACKEND_URL);
const api = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	// withCredentials: false,
	withCredentials: true,
});

export const openApi = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL
});

export default api;
