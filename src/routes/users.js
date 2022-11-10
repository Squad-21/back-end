const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const authMiddleware = require('../middlewares/authenticate');

// Criar novo usuário
router.post('/register', UserController.register);

// Retornar todos os usuários
router.get('/users', authMiddleware, UserController.index);

// Retornar dados do usuário
router.get('/:id', UserController.show);

// Remover usuário
router.delete('/:id', authMiddleware, UserController.delete);

// Atualizar dados de um usuário
router.put('/:id', authMiddleware, UserController.update);

// Autenticar usuário
router.post('/authenticate', UserController.authenticate);

module.exports = router;
