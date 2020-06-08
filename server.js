const express = require("express"),
    app = express(),
    cors = require("cors"),
    port = 8000,
    server = app.listen(port,() => console.log(`Listening on port ${port}`)),
    io = require("socket.io")(server);


app.use(cors());
app.use(express.json());

require("./server/config/database.config");
require("./server/routes/sudoku.routes")(app);
require("./server/routes/tcUser.routes")(app);
require("./server/controllers/tcSocket.controller")(io);