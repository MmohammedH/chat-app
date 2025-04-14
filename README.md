# 🗨️ Socket.IO Chat App

A real-time chat application built with **React**, **Express**, and **Socket.IO** that includes:

- 🔐 JWT-based user authentication
- 💬 Namespace-based chat via `/chat`
- 📜 Chat history retrieval via REST API
- 🏠 Room-based messaging

---

## 📦 Features

- **JWT Authentication** with secure HTTP-only cookies
- **Namespace Segmentation** using `/chat`
- **Real-time Messaging** with Socket.IO
- **Join Rooms** to group conversations
- **In-Memory Chat History** retrieval with REST API
- Clean and responsive UI using **Material UI**

---

## 🧠 Chat History API
Endpoint	      Method	    Description
/history/:room	GET	        Returns chat history of a room
/login	        GET	        Issues JWT for user authentication

## 📌 Tech Stack
Frontend: React, Material UI, Axios
Backend: Node.js, Express, Socket.IO, JWT
Auth: HTTP-only cookies with JWT
Namespace: /chat

## 💡 To-Do / Extensions
⏳ Store chat history in MongoDB or Firebase
👤 Multi-user login and registration
📱 Responsive UI improvements
🔒 Role-based access control
