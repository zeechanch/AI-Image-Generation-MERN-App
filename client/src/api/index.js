import axios from "axios";

const API =axios.create({
    baseURL: "http://localhost:8080/api",
});

export const getPosts = async () => await API.get("/posts/");
export const createPost = async (data) => await API.post("/posts/", data); 
export const generateImage = async (data) => await API.post("/generateImage", data);