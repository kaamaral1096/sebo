const express = require("express");
const usersController = require("./src/controllers/users");
const productsController = require("./src/controllers/products");
const categoriesController = require("./src/controllers/categories");

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Hello World!');
});

routes.get("/users", usersController.findAll);
routes.post("/users", usersController.addUser);
routes.put("/users/:idUsers", usersController.updateUser);
routes.delete("/users/:idUsers", usersController.deleteUser);
routes.get("/users/:idUsers", usersController.findUser);

routes.post("/products", productsController.addProduct);
routes.get('/products/filters', productsController.getFilteredProducts);
routes.get("/products", productsController.getAllProducts);
routes.get("/products/:idProducts", productsController.getProductById);
routes.put("/products/:idProducts", productsController.updateProduct); // Adicionando a rota para atualizar um produto


routes.post("/categories", categoriesController.createCategory);
routes.get("/categories", categoriesController.listCategories);
routes.put("/categories/:idCategory", categoriesController.editCategory);
routes.delete("/categories/:idCategory", categoriesController.deleteCategory)

module.exports = routes;