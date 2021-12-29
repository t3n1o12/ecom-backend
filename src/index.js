import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
// import userRouter from "./routers/userRouter.js";
import user from "./routers/user.js";
import orderRouter from "./routers/orderRouter.js";
import customerRouter from "./routers/customerRouter.js";
import addressRouter from "./routers/addressRouter.js";
import reveunuRouter from "./routers/reveunuRouter.js";
import morgan from "morgan";
import conversationRouter from "./routers/conversationRouter.js";
import messageRouter from "./routers/messageRouter.js";
import { Server, Socket } from "socket.io";
import http from 'http';
import dialogflowRouter from "./routers/dialogflowRouter.js";

const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  }
})

let users = [];
///controller
const addUser = (userId, socketId) => {
  !users.some(user => user.userId === userId) && users.push({ userId, socketId })
}
const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
  return users.find(user => user.userId === userId)
}
io.on('connection', socket => {
  console.log('new ws connection...')

  //take userId and socket ID
  socket.on("addUser", userId => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  })

  //send take message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,

    })
  })
  //when user disconnect
  socket.on("disconnect", () => {
    console.log("someone has left")
    removeUser(socket.id);
    io.emit("getUsers", users);
  })
})




mongoose.connect("mongodb://localhost/ekafekin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//chay server
app.get("/", (req, res) => {
  res.send("Server is running");
});

//share upload forder
app.use("/upload", express.static("upload"));
// dung userROuter
// app.use(" ", userRouter);
app.use("/api/users", user)
// dung productRouter
app.use("/api/products", productRouter);
//Category
app.use("/api/categories", categoryRouter);
//Category
app.use("/api/address", addressRouter);
//cart
app.use("/api/order", orderRouter);
//order
app.use("/api/renueve", reveunuRouter);
//customer
app.use("/api/customers", customerRouter);
//chat
app.use("/api/conversation", conversationRouter)
app.use("/api/message", messageRouter)
app.use("/api/bot",dialogflowRouter)
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

server.listen(5000, () => {
  console.log("Server is ready at http://localhost:5000");
});
