const SudController = require("../controllers/sudoku.controller");

module.exports = (app) => {
    app.get("/api/sudoku/new",SudController.newPuzzle);
}