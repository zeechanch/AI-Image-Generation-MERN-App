import axios from "axios";

// Use deployed API if provided, fallback to local dev server
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

const API = axios.create({
    baseURL: API_BASE_URL,
});

export const getPosts = async () => await API.get("/posts/");
export const createPost = async (data) => await API.post("/posts/", data); 
export const generateImage = async (data) => await API.post("/generateImage", data);