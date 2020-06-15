const express = require("express"),
    app = express(),
    cors = require("cors"),
    port = 8080,
    server = app.listen(port,() => console.log(`Listening on port ${port}`)),
    io = require("socket.io")(server);


app.use(cors({"origin":"http://18.216.108.30"}));

require("./server/controllers/tcSocket.controller")(io);