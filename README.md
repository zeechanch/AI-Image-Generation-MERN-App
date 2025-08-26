# NexArt – AI Image Generator

NexArt is a modern AI-powered image generator that lets users create, store, and explore artwork effortlessly.
Built with the MERN stack, it integrates Freepik API for image generation and Cloudinary for secure image storage.

---

## Features

* AI-powered image generation via Freepik API
* Cloud-based image storage with Cloudinary
* Download and manage generated artwork
* Full-stack MERN architecture (MongoDB, Express, React, Node.js)
* Secure API key management with environment variables

---

## Tech Stack

Frontend: React (hosted on Vercel)
Backend: Node.js + Express (hosted on Render)
Database: MongoDB Atlas
Image Storage: Cloudinary
AI Generation: Freepik API

---

## Project Structure

NexArt/

├── client/        # React frontend (Vercel)

├── server/        # Node/Express backend (Render)

├── .gitignore

├── README.md

---

## Setup & Installation

1. Clone the repo

```
git clone https://github.com/your-username/nexart.git
cd nexart
```

2. Install dependencies

Frontend:

```
cd client
npm install
```

Backend:

```
cd ../server
npm install
```

3. Add environment variables
   Create `.env` files inside `client/` and `server/`.
   Do NOT commit these files to GitHub.

Example `.env` for backend (server/.env):

```
PORT=5000
MONGO_URI=your-mongodb-uri
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
FREEPIK_API_KEY=your-freepik-key
```

4. Run locally

Frontend:

```
cd client
npm start
```

Backend:

```
cd server
npm run dev
```

---

## Deployment

Frontend → Vercel
Backend → Render
Database → MongoDB Atlas
Image Storage → Cloudinary

---

## Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit a PR.

---

## License

This project is licensed under the MIT License.

---

## Author

Zeeshan – GitHub: [https://github.com/your-username](https://github.com/zeechanch)
