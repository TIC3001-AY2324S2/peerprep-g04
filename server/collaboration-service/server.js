import http from "http";
import index from "./index.js";
import "dotenv/config.js";
import { Server } from "socket.io";
import { SocketAddress } from "net";

const port = process.env.PORT || 3004;

const server = http.createServer(index);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room: ${room}`);
  });

  socket.on("leave_room", (room) => {
    socket.leave(room);
    console.log(`Socket ${socket.id} left room: ${room}`);
  });

  socket.on("send_code", (data) => {
    console.log(data);
    if (socket.rooms.has(data.room)) {
      socket.to(data.room).emit("receive_code", data);
    }
  });
});

console.log("Collaboration Service - Starting on Port: ", port);

server.listen(port);
