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

<img width="1274" alt="Screenshot 2025-06-26 at 15 26 02" src="https://github.com/user-attachments/assets/bd9dd720-894e-44e2-8b1a-6f8871b333ff" />
<img width="1417" alt="Screenshot 2025-06-26 at 15 25 33" src="https://github.com/user-attachments/assets/d2fed0f4-40ab-46a4-a8f3-9c7d2968d3d6" />
<img width="1248" alt="Screenshot 2025-06-26 at 15 26 57" src="https://github.com/user-attachments/assets/70e59124-5e99-429e-903f-54c316511a11" />
<img width="1343" alt="Screenshot 2025-06-26 at 15 26 16" src="https://github.com/user-attachments/assets/468710b1-c0c4-4b58-afc9-e07ba1752e41" />
<img width="1304" alt="Screenshot 2025-06-26 at 15 26 28" src="https://github.com/user-attachments/assets/51f9657c-a7db-44e1-8896-492a7e18bfb5" />


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

`.env` file
PORT=5000
MONGO_URI=mongodb+srv://your_user:your_pass@cluster.mongodb.net/chatrix
JWT_SECRET="your_super_secret_jwt_key"
CLOUDINARY_CLOUD_NAME="Your-CLOUDINARY_CLOUD_NAME"
CLOUDINARY_API_KEY="Your-CLOUDINARY_API_KEY"
CLOUDINARY_API_SECRET="Your-CLOUDINARY_API_SECRET"


#### 📦 `client/.env` (Example)

VITE_BACKEND_URL="VITE_BACKEND_URL"  


## 📦 Installation
### Clone the repository
git clone https://github.com/GewoonMarian/chatrix.git
cd chatrix

### Install server dependencies
cd server
npm install

### Install client dependencies
cd ../client
npm install
