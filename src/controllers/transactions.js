const Products = require("../models/products");
const Users = require('../models/users');
const Transactions = require("../models/transactions");

async function createTransactions(req, res) {
    try {
        const { sellerId, buyerId, productsId, buyerData } = req.body;

        const seller = await Users.findByPk(sellerId);
        const buyer = await Users.findByPk(buyerId);
        const product = await Products.findByPk(productsId);

        if (!seller || !buyer || !product) {
            const notFoundResponse = {
                statusCode: 404,
                message: 'Vendedor, comprador ou produto não encontrado.',
            };
            return res.status(404).json(notFoundResponse);
        }

        const transaction = await Transactions.create({
            sellerId,
            buyerId,
            productsId,
            buyerData,
        });

        const successResponse = {
            statusCode: 201,
            message: 'Transação realizada com sucesso.',
            data: transaction,
        };

        return res.status(201).json(successResponse);
    } catch (error) {
        console.error('Erro ao realizar transação:', error);
        const errorResponse = {
            statusCode: 500,
            message: 'Erro interno do servidor',
            error: error.message,
        };

        return res.status(500).json(errorResponse);
    }
}


async function getTransactionDetails(req, res) {
    try {
        const { transactionId } = req.params;

        const transaction = await Transactions.findByPk(transactionId, {
            include: [
                { model: Users, as: 'seller' },
                { model: Users, as: 'buyer' },
                { model: Products, as: 'product' },
            ],
        });

        if (!transaction) {
            const notFoundResponse = {
                statusCode: 404,
                message: 'Transação não encontrada.',
            };
            return res.status(404).json(notFoundResponse);
        }

        if (req.user.idUsers !== transaction.seller.idUsers) {
            const unauthorizedResponse = {
                statusCode: 403,
                message: 'Apenas o vendedor pode visualizar esta transação.',
            };
            return res.status(403).json(unauthorizedResponse);
        }

        const successResponse = {
            statusCode: 200,
            message: 'Detalhes da transação obtidos com sucesso.',
            data: transaction,
        };

        return res.status(200).json(successResponse);
    } catch (error) {
        console.error('Erro ao obter detalhes da transação:', error);
        const errorResponse = {
            statusCode: 500,
            message: 'Erro interno do servidor',
            error: error.message,
        };

        return res.status(500).json(errorResponse);
    }
}
module.exports = { transactions: createTransactions,getTransactionDetails };
