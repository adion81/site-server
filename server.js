const express = require("express"),
    app = express(),
    cors = require("cors"),
    port = 8000,
    axios = require("axios")
    server = app.listen(port,() => console.log(`Listening on port ${port}`));


app.use(cors());
app.use(express.json());

require("./server/config/database.config");
require("./server/routes/sudoku.routes")(app);