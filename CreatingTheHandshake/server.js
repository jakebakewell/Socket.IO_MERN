// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(8000, () =>
    console.log('The server is all fired up on port 8000')
);

// To initialize the socket, we need to
// invoke the socket.io library
// and pass it our Express server
const io = require('socket.io')(server, { cors: true });

io.on("connect", socket => {
    console.log(socket.id);
});
const chat = [];
io.on("connection", socket => {
    console.log("Nice to meet you. (shake hand)");
    console.log("*****************************");
    io.emit("Updating", chat);
    socket.emit("Welcome", console.log("Welcome the socket emit is working"))
    // socket.emit("event_from_client", data => {
    //     console.log("In the emit event");
    //     console.log(data.message);
    // });
    socket.on("event_from_client", data => {
        chat.push(data.message);
        console.log(data.message);
        io.emit("Updating", chat);
    });
});
