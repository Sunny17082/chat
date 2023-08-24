const express = require("express");
const app = express();
const socket = require('socket.io');
// const http = require("http").createServer(app);
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.use(express.static(__dirname+"/public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

// socket

const io = socket(server);
// io.set('transports', ['websocket']);

io.on("connection", (socket) => {
    console.log("connected...");
    socket.on("message", (msg) => {
        socket.broadcast.emit("message", msg);
    });
})