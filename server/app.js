import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const secretKeyJWT = "asdasdsadasdasdasdsa";
const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

// In-memory chat history (use DB for persistence in real-world)
const chatHistory = {};

// Login route to issue JWT
app.get("/login", (req, res) => {
  const token = jwt.sign({ _id: "asdasjdhkasdasdas" }, secretKeyJWT);
  res
    .cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
    .json({ message: "Login Success" });
});

// Get chat history for a room
app.get("/history/:room", (req, res) => {
  const room = req.params.room;
  res.json({ messages: chatHistory[room] || [] });
});

// /chat namespace
const chatNamespace = io.of("/chat");

chatNamespace.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res || {}, (err) => {
    if (err) return next(err);

    const token = socket.request.cookies.token;
    if (!token) return next(new Error("Authentication Error"));

    try {
      const decoded = jwt.verify(token, secretKeyJWT);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Invalid Token"));
    }
  });
});

chatNamespace.on("connection", (socket) => {
  console.log("User connected to /chat:", socket.id);

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on("message", ({ room, message }) => {
    if (!chatHistory[room]) chatHistory[room] = [];
    chatHistory[room].push(message); // Store message in memory
    socket.to(room).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected from /chat:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
