# CyberTalk

**CyberTalk** is a secure, real-time one-to-one messaging app built on the MERN stack. It supports text and image messaging with modern features such as email-based OTP authentication, avatar generation, user profile customization, toast notifications, and live online/offline presence tracking.

---

## 🚀 Features

- 🧑 Unique usernames with auto-generated robot avatars
- 💬 One-to-one real-time messaging (no group chats)
- 📷 Image support via Cloudinary
- 🔐 Email OTP-based 2FA (via Nodemailer)
- 🔑 Forgot password, change password, and change username flows
- 🖼️ Profile picture upload and update
- 🟢 Live online/offline user status
- 📩 Display of last message in chat preview
- 🧠 Persistent login with JWT
- 🔔 **Toast notifications** for important actions (e.g., login, errors, status updates)

---

## 🛠️ Tech Stack

### Frontend

- **React** – UI library
- **React Router** – Client-side routing
- **Zustand** – Lightweight state management
- **Axios** – HTTP requests
- **Socket.io-client** – Real-time communication
- **Toast Library (e.g., react-hot-toast or react-toastify)** – Feedback notifications

### Backend

- **Node.js** – Runtime environment
- **Express.js** – Server framework
- **MongoDB + Mongoose** – Database and ODM
- **Socket.io** – Real-time communication
- **JWT** – Authentication
- **bcrypt** – Password hashing
- **CORS** – Cross-origin protection
- **Nodemailer** – Email delivery for OTP
- **Cloudinary** – Image upload and storage
