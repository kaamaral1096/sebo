const Users = require("../models/users");

async function findAll(_req, res) {
    try {
        const users = await Users.findAll();
        const responseData = {
            statusCode: 200,
            message: "Lista de usuários recuperada com sucesso.",
            data: users, // Insira os dados reais aqui
        };
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Erro ao buscar a lista de usuários:", error);

        const errorResponse = {
            statusCode: 500,
            message: "Erro interno do servidor.",
            error: error.message, // Inclua informações de erro úteis aqui
        };

        res.status(500).json(errorResponse);
    }
}

async function addUser(req, res) {
    try {
        if (req.body.userTypeId === 1) {
            const responseData = {
                statusCode: 400,
                message: 'Não é possível criar um usuário administrador, solicite permissionamento ao gerenciador site',
            };
            return res.status(400).json(responseData);
        }
        const newUser = await Users.create(
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                userTypeId: req.body.userTypeId
            });

        const responseData = {
            statusCode: 201,
            message: 'Usuário criado com sucesso',
            data: newUser,
        };

        res.status(201).json(responseData);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        const errorResponse = {
            statusCode: 500,
            message: 'Erro interno do servidor',
            error: error.message,
        };

        res.status(500).json(errorResponse);
    }
}

async function updateUser(req, res) {
    try {
        console.log(req.params.idUser)
        const updatedUser = await Users.update(
            {
                name: req.body.nome,
            },
            {
                where: {
                    idUser: req.params.idUser,
                },
            }
        );
        if (updatedUser[0] === 1) {

            const responseData = {
                statusCode: 200,
                message: 'Usuário atualizado com sucesso',
                data: updatedUser,
            };
            res.status(200).json(responseData);
        } else {
            const errorResponse = {
                statusCode: 404,
                message: 'Usuário não encontrado',
            };
            res.status(404).json(errorResponse);
        }
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        const errorResponse = {
            statusCode: 500,
            message: 'Erro interno do servidor',
            error: error.message,
        };
        res.status(500).json(errorResponse);
    }
}

async function deleteUser(req, res) {
    try {
        const isAdmin = await verifyIfAdminLogin(req, res);
        if (isAdmin) {
            await Users.update(
                {
                    active: 0,
                },
                {
                    where: {
                        idUser: req.params.idUser,
                    },
                }
            );
            const responseData = {
                statusCode: 200,
                message: 'Usuário desativado com sucesso'
            };
            res.status(200).json(responseData);
        } else {
            const responseData = {
                statusCode: 403,
                message: 'Usuário não tem permissão para desativar outros'
            };
            res.status(200).json(responseData);
        }

    } catch (error) {
        console.error('Erro ao desativar usuário:', error);
        const errorResponse = {
            statusCode: 500,
            message: 'Erro interno do servidor',
            error: error.message,
        };
        res.status(500).json(errorResponse);
    }
}

async function findUser(req, res) {
    try {

        const foundUser = await Users.findByPk(req.params.idUser);
        if (foundUser === null) {
            const errorResponse = {
                statusCode: 404,
                message: "Usuário não encontrado.",
            };
            return res.status(404).json(errorResponse);
        }

        const responseData = {
            statusCode: 200,
            message: "Usuário encontrado com sucesso.",
            data: foundUser,
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);

        const errorResponse = {
            statusCode: 500,
            message: "Erro interno do servidor.",
            error: error.message,
        };

        res.status(500).json(errorResponse);
    }
}

async function verifyIfAdminLogin(req, res) {
    try {
        const { email, password } = req.body.login;
        const adminUser = await Users.findOne({ where: { email, password, userTypeId: 1 } });
        console.log("admiuser")
        console.log(adminUser)
        if (!adminUser) {
            console.log('entrou no if')
            return false
        }
        return true
    } catch (error) {
        return false;
    }
}
module.exports = { findAll, updateUser, addUser, deleteUser, findUser };
