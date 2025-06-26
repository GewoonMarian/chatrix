# Chatrix 🗨️

Chatrix is a full-stack real-time chat application built with React, Node.js, Express, MongoDB, and Socket.IO. It features secure JWT-based authentication, real-time messaging, and a responsive user interface styled with Tailwind CSS.

---

## 🚀 Features

- 🔐 JWT Authentication (Login / Register)
- 🧑‍🤝‍🧑 One-to-one real-time chat using Socket.IO
- 💬 Instant message sending and receiving
- 🗂️ User and chat management
- 🌐 RESTful API built with Express.js
- 🛠️ Clean React frontend with Tailwind CSS
- 📦 MongoDB & Mongoose for data persistence

---

## 🧰 Tech Stack

| Frontend          | Backend         | Realtime          | Database  |
|-------------------|------------------|--------------------|-----------|
| React (Vite)      | Node.js, Express | Socket.IO          | MongoDB   |
| Axios, Tailwind   | JWT Auth         | WebSocket protocol | Mongoose  |

---

## 📸 Screenshots

> Add images/gifs of login screen, chat page, etc., here

---

## 🧑‍💻 Local Development

### 🔧 Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or remote)
- [Vercel CLI](https://vercel.com/docs/cli) and/or [Railway](https://railway.app/) account (for deployment)

---

### 🔐 Environment Variables

Create two `.env` files, one in `client/` and one in `server/`.

#### 📦 `server/.env` (Example)

```env```
PORT=5000
MONGO_URI=mongodb+srv://your_user:your_pass@cluster.mongodb.net/chatrix
JWT_SECRET="your_super_secret_jwt_key"
CLOUDINARY_CLOUD_NAME="Your-CLOUDINARY_CLOUD_NAME"
CLOUDINARY_API_KEY="Your-CLOUDINARY_API_KEY"
CLOUDINARY_API_SECRET="Your-CLOUDINARY_API_SECRET"


#### 📦 `client/.env` (Example)
VITE_BACKEND_URL="VITE_BACKEND_URL"  


### 📦 Installation
# Clone the repository
git clone https://github.com/GewoonMarian/chatrix.git
cd chatrix

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
