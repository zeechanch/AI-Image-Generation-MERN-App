import * as dotenv from "dotenv";
import {createError} from "../error.js";

dotenv.config();

export const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        const apiKey = process.env.FREEPIK_API_KEY;

        if (!apiKey) {
            return next(createError(500, "FREEPIK_API_KEY is missing in environment variables"));
        }

        // Call Freepik text-to-image endpoint (synchronous)
        const response = await fetch("https://api.freepik.com/v1/ai/text-to-image", {
            method: "POST",
            headers: {
                "x-freepik-api-key": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: prompt,
                guidance_scale: 1.5,
                filter_nsfw: false,
                image: {
                    num_images: 1
                }
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw createError(response.status, `Freepik API error: ${errorText}`);
        }

        const result = await response.json();
        console.log('Freepik API response:', JSON.stringify(result, null, 2));
        
        if (result.data && result.data.length > 0) {
            // Freepik returns an object with base64 and has_nsfw properties
            const imageData = result.data[0];
            
            if (imageData.base64) {
                // Return just the base64 string - frontend will format it
                return res.status(200).json({ 
                    photo: imageData.base64,
                    status: "COMPLETED",
                    has_nsfw: imageData.has_nsfw || false
                });
            } else if (typeof imageData === 'string') {
                // If it's a direct URL string
                return res.status(200).json({ 
                    photo: imageData,
                    status: "COMPLETED"
                });
            } else {
                throw createError(500, "Unexpected image data format from Freepik API");
            }
        } else {
            throw createError(500, "No image generated from Freepik API");
        }

    } catch (error) {
        console.error('GenerateImage error:', error);
        next(createError(error.status || 500, error?.message || "Image generation failed"));
    }
};