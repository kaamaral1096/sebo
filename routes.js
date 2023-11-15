const express = require("express");
const usersController = require("./src/controllers/users"); // Importe o controlador corretamente

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Hello World!');
});

routes.get("/users", usersController.findAll);

routes.post("/users", usersController.addUser);

routes.put("/users/:idUsers", usersController.updateUser);

routes.delete("/users/:idUsers", usersController.deleteUser);

routes.get("/users/:idUsers", usersController.findUser);

module.exports = routes;