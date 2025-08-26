import axios from "axios";

// Use deployed API if provided, fallback to local dev server
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

console.log("Using API base URL:", API_BASE_URL); // helpful for debugging

const API = axios.create({
  baseURL: API_BASE_URL,
});

export const getPosts = () => API.get("/posts");
export const createPost = (data) => API.post("/posts", data);
export const generateImage = (data) => API.post("/generateImage", data);
