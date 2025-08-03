import axios from "axios";
import useAuth from "../hooks/useAuth";
const BASE_URL = "http://localhost:5000/api/";
// const { auth } = useAuth();
axios.defaults.withCredentials = true;

// axios.defaults.headers.common["Authorization"] = `Bearer ${}`;
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
