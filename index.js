import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
});

io.on("connection", (socket) => {
    console.log(`CONNECTION IS OPEN { ID: ${socket.id} }`);

    socket.on("disconnect", () => {
        console.log(`CONNECTION IS CLOSED { ID: ${socket.id} }`);
    })

    socket.on("msg", (data) => {
        console.log(data, socket.id);
        socket.broadcast.emit("msg", `form <b>id:</b> ${socket.id} -> <b>${data}</b>`);
    })
})

server.listen(1000, () => {
    console.log("Server started!!!");
});