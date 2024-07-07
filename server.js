var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

var users = [];
var connections = [];

server.listen(3000);
console.log('Server is listening on port 3000');

app.get("/", function(req, resp) {
    // Route for localhost:3000/
    resp.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
    // When client connects to server
    connections.push(socket); // Add socket detail to connections array
    console.log("Connected: %s sockets connected", connections.length); // Current connections count

    socket.on("disconnect", function() {
        // Client disconnected from server
        connections.splice(connections.indexOf(socket), 1); // Remove socket from connections array
        console.log("Disconnected: %s sockets connected", connections.length); // Current connections count
    });

    socket.on("send message", function(data) {
        console.log(data);
        io.sockets.emit("new message", { msg: data }); // Emit message to all connected clients
    });
});
