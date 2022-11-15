const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const authMiddleware = require('../middlewares/authenticate');

// Adicionar um novo usuário - OK
router.post('/register', UserController.register);

// Autenticar usuário - OK
router.post('/authenticate', UserController.authenticate);

// Retornar todos os usuários - OK
router.get('/users', authMiddleware, UserController.index);

// Retornar dados de um usuário - OK
router.get('/:id', UserController.show);

// Remover um usuário - OK
router.delete('/:id', authMiddleware, UserController.delete);

// Atualizar dados de um usuário - OK
router.put('/:id', authMiddleware, UserController.update);

module.exports = router;
