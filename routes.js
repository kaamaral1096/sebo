const express = require("express");
const usersController = require("./src/controllers/users"); // Importe o controlador corretamente

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Hello World!');
});

routes.get("/users", usersController.findAll);

routes.post("/users", usersController.addUser);

routes.put("/users/:idUser", usersController.updateUser);

routes.delete("/users/:idUser", usersController.deleteUser);

routes.get("/users/:idUser", usersController.findUser);

module.exports = routes;