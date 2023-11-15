const Products = require("../models/products");
const Categories = require("../models/categories");
const Users = require('../models/users');

async function addProduct(req, res) {
    try {
        const {
            title,
            price,
            description,
            edition,
            frequency,
            sellerId,
            isbn,
            categoryName, 
            status,
            idUsers,
            authors,
            login,
        } = req.body;

        // Buscar o ID da categoria pelo nome
        const category = await Categories.findOne({
            where: { category: categoryName },
        });

        if (!category) {
            // Se a categoria não for encontrada, retornar um erro
            const errorResponse = {
                statusCode: 400,
                message: `Categoria '${categoryName}' não encontrada.`,
            };
            return res.status(400).json(errorResponse);
        }

        const user = await Users.findOne({
            where: {
                email: login.email,
                password: login.password,
            },
        });

        if (!user) {
            const errorResponse = {
                statusCode: 401,
                message: "Credenciais inválidas. Usuário não encontrado.",
            };
            return res.status(401).json(errorResponse);
        }

        const newProduct = await Products.create({
            title,
            price,
            description,
            edition,
            frequency,
            sellerId,
            isbn,
            categoryId: category.idCategory, 
            status,
            idUsers: user.idUsers, 
            authors,
        });

        const responseData = {
            statusCode: 201,
            message: 'Produto criado com sucesso',
            data: newProduct,
        };

        res.status(201).json(responseData);
    } catch (error) {
        console.error('Erro ao criar Produto:', error);
        const errorResponse = {
            statusCode: 500,
            message: 'Erro interno do servidor',
            error: error.message,
        };

        res.status(500).json(errorResponse);
    }
}

async function getAllProducts(req, res) {
    try {
        const allProducts = await Products.findAll();

        const responseData = {
            statusCode: 200,
            message: 'Lista de produtos recuperada com sucesso',
            data: allProducts,
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Erro ao recuperar a lista de produtos:', error);
        const errorResponse = {
            statusCode: 500,
            message: 'Erro interno do servidor',
            error: error.message,
        };

        res.status(500).json(errorResponse);
    }
}

async function getProductById(req, res) {
    const productId = req.params.idProducts;
    try {
        const product = await Products.findByPk(productId);

        if (!product) {
            const notFoundResponse = {
                statusCode: 404,
                message: 'Produto não encontrado',
            };

            return res.status(404).json(notFoundResponse);
        }

        const responseData = {
            statusCode: 200,
            message: 'Produto recuperado com sucesso',
            data: product,
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Erro ao recuperar o produto pelo ID:', error);
        const errorResponse = {
            statusCode: 500,
            message: 'Erro interno do servidor',
            error: error.message,
        };

        res.status(500).json(errorResponse);
    }
}

async function updateProduct(req, res) {
    try {
        const { idProducts } = req.params;
        const { title, price, description, edition, frequency, status } = req.body;

        const existingProduct = await Products.findByPk(idProducts);
        if (!existingProduct) {
            const notFoundResponse = {
                statusCode: 404,
                message: 'Produto não encontrado',
            };
            return res.status(404).json(notFoundResponse);
        }

        existingProduct.title = title || existingProduct.title;
        existingProduct.price = price || existingProduct.price;
        existingProduct.description = description || existingProduct.description;
        existingProduct.edition = edition || existingProduct.edition;
        existingProduct.frequency = frequency || existingProduct.frequency;
        existingProduct.status = status || existingProduct.status;

        await existingProduct.save();

        const responseData = {
            statusCode: 200,
            message: 'Produto atualizado com sucesso',
            data: existingProduct,
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Erro ao atualizar Produto:', error);
        const errorResponse = {
            statusCode: 500,
            message: 'Erro interno do servidor',
            error: error.message,
        };

        res.status(500).json(errorResponse);
    }
}

async function getFilteredProducts(req, res) {
    try {
        const { categoryId, price } = req.query;

        const condition = {};

        if (categoryId) {
            condition.categoryId = categoryId;
        }

        if (price) {
            condition.price = price.trim();
        }

        const filteredProducts = await Products.findAll({
            where: condition,
        });

        const successResponse = {
            statusCode: 200,
            message: 'Produtos filtrados com sucesso.',
            data: filteredProducts,
        };

        res.status(200).json(successResponse);
    } catch (error) {
        console.error('Erro ao filtrar produtos:', error);
        const errorResponse = {
            statusCode: 500,
            message: 'Erro interno do servidor',
            error: error.message,
        };

        res.status(500).json(errorResponse);
    }
}

module.exports = { addProduct, getAllProducts, getProductById, updateProduct, getFilteredProducts };
