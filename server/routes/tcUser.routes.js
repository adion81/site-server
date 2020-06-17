const tcController = require("../controllers/tc.controller");

module.exports = (app) => {
    app.post("/api/tc",tcController.createToughChoice);
    app.post("/api/tc/user/:title",tcController.addUser);
    app.get("/api/tc/:title",tcController.showToughChoice);
    app.put("/api/tc/user/update/:userId/:title",tcController.updateUser);
    app.put("/api/tc/deactivate/:title",tcController.deactivate);
}