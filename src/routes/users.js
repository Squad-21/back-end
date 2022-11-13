const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const authMiddleware = require('../middlewares/authenticate');

// Adicionar um novo usuário
router.post('/register', UserController.register);

// Autenticar usuário
router.post('/authenticate', UserController.authenticate);

// Retornar todos os usuários
router.get('/users', authMiddleware, UserController.index);

// Retornar dados de um usuário
router.get('/:id', UserController.show);

// Remover um usuário
router.delete('/:id', authMiddleware, UserController.delete);

// Atualizar dados de um usuário
router.put('/:id', authMiddleware, UserController.update);

module.exports = router;
