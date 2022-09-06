const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./db/Database.js")

// Handling uncaught Exception
process.on("uncaughtException",(err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for Handling uncaught Exception`);
})

// config

dotenv.config({
    path:"./config/.env"
});
// connect database

connectDatabase();

// creating server

const server = app.listen(process.env.PORT, ()=>{
    console.log('server is running on http://localhost:' + process.env.PORT);
})

// Unhandled promise rejection
process.on("unhandledRejection", (err) =>{
    console.log(`Shutting down server for ${err.message}`);
    console.log(`Shutting down the server due to Unhandled promise rejection`);
    server.close(() =>{
        process.exit(1);
    });
});
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  console.log(users, "users");
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  // console.log(`User Connect ${socket.id}`);

  //take userid and socket id from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message

  socket.on("sendMessage", ({ senderId, receiverId, text, type, name }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
      type,
      name,
    });
  });

  //when disconnected
  socket.on("disconnect", () => {
    console.log(`User Disconnect ${socket.id}`);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});