import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import express from "express";
import PostRouter from "./routes/Posts.js";
import GenerateImageRouter from "./routes/generateImage.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true}));

// error handlers

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";

    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.use("/api/posts", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);
// Default get

app.get("/", async (req, res) => {
    res.status(200).json({
        message: "Server is running",
    });
});

// Function to connect to MongoDB

const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("Failed to connect to MongoDB");
        console.error(err);
    });
    

}


// Function to start the server

const startServer = async () =>{
    try{
        connectDB();
        app.listen(8080, () => console.log("Server is running on port 8080"));
    }
    catch(error){
        console.log(error);
    }
}

// Start the server
startServer();
// 
