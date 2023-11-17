const Categories = require("../models/categories");
const Users = require("../models/users");

async function createCategory(req, res) {
    try {
        const { category, categoryDescription, active } = req.body;

        const newCategory = await Categories.create({
            category,
            categoryDescription,
            active
        });

        const responseData = {
            statusCode: 201,
            message: 'Categoria criada com sucesso',
            data: newCategory,
        };

        res.status(201).json(responseData);
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        const errorResponse = {
            statusCode: 500,
            message: 'Erro interno do servidor',
            error: error.message,
        };

        res.status(500).json(errorResponse);
    }
}

async function listCategories(req, res) {
    try {
        const categories = await Categories.findAll();

        const responseData = {
            statusCode: 200,
            message: 'Lista de categorias',
            data: categories,
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Erro ao listar categorias:', error);
        const errorResponse = {
            statusCode: 500,
            message: 'Erro interno do servidor',
            error: error.message,
        };

        res.status(500).json(errorResponse);
    }
}

async function editCategory(req, res) {
    try {
        const { idCategory } = req.params;
        const { category, categoryDescription, active } = req.body;

        const updatedCategory = await Categories.update(
            {
                category,
                categoryDescription,
                active,
            },
            {
                where: {
                    idCategory,
                },
            }
        );

        if (updatedCategory[0] === 1) {
            const responseData = {
                statusCode: 200,
                message: 'Categoria editada com sucesso',
                data: updatedCategory,
            };

            res.status(200).json(responseData);
        } else {
            const notFoundResponse = {
                statusCode: 404,
                message: 'Categoria não encontrada',
            };
            res.status(404).json(notFoundResponse);
        }
    } catch (error) {
        console.error('Erro ao editar categoria:', error);
        const errorResponse = {
            statusCode: 500,
            message: 'Erro interno do servidor',
            error: error.message,
        };

        res.status(500).json(errorResponse);
    }
}
async function deleteCategory(req, res) {
    try {
        const categoryToDeactivate = await Categories.findByPk(req.params.idCategory);

        if (categoryToDeactivate) {
            await Categories.update(
                {
                    active: false,
                },
                {
                    where: {
                        idCategory: req.params.idCategory,
                    },
                }
            );

            const responseData = {
                statusCode: 200,
                message: 'Categoria desativada com sucesso.',
            };
            res.status(200).json(responseData);
        } else {
            const errorResponse = {
                statusCode: 404,
                message: 'Categoria não encontrada.',
            };
            res.status(404).json(errorResponse);
        }
    } catch (error) {
        console.error('Erro ao desativar categoria:', error);

        const errorResponse = {
            statusCode: 500,
            message: 'Erro interno do servidor.',
            error: error.message,
        };
        res.status(500).json(errorResponse);
    }
}

module.exports = { createCategory, listCategories, editCategory, deleteCategory };
