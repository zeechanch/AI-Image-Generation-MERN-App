import Post from "../models/Post.js";
import * as dotenv from "dotenv";
import {createError} from "../error.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json({success: true, data: posts});
    } catch (error) {
        next(createError(error.status, error?.response?.data?.error?.message || error?.message));
    }
};

// Create a post

export const createPost = async (req, res, next) => {
    try {
        const {name, prompt, photo} = req.body;
        let base64Data = photo;
        
        // Extract base64 data if it's a data URL
        if (photo.startsWith('data:')) {
            base64Data = photo.split(',')[1];
        }
        
        const photoUrl = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Data}`);
        const newPost = await Post.create({
            name, 
            prompt, 
            photo: photoUrl?.secure_url
        });
        res.status(201).json({success: true, data: newPost});
    } catch (error) {
        next(createError(error.status, error?.response?.data?.error?.message || error?.message));
    }
};
