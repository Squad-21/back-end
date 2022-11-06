const express = require('express');
const router = express.Router();
const TrilhaController = require('../Controllers/TrilhaController');
const authMiddleware = require('../middlewares/authenticate');

// Retornar todas as trilhas
router.get('/', TrilhaController.index);

// Retornar uma trilha específica
router.get('/:id', TrilhaController.show);

// Adicionar nova trilha
router.post('/', authMiddleware, TrilhaController.store);

// Atualizar uma trilha específica
router.put('/:id', authMiddleware, TrilhaController.update);

// Deletar uma trilha específica
router.delete('/:id', authMiddleware, TrilhaController.delete);

module.exports = router;
