const tcController = require("../controllers/tc.controller");

module.exports = (app) => {
    app.post("/api/tc",tcController.createToughChoice);
    app.post("/api/tc/user/:id",tcController.addUser);
    app.get("/api/tc/:id",tcController.showToughChoice);
    app.put("/api/tc/user/update/:userId/:tcId",tcController.updateUser);
}