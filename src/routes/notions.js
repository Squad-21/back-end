const express = require('express');
const router = express.Router();
const NotionController = require('../Controllers/NotionController');
const authMiddleware = require('../middlewares/authenticate');

// Retornar os notions de uma trilha
router.get('/:id', NotionController.index);

// Adicionar nova notion
router.post('/', authMiddleware, NotionController.store);

// Atualizar uma notion específica
router.put('/:id', authMiddleware, NotionController.update);

// Deletar uma notion específica
router.delete('/:id', authMiddleware, NotionController.delete);

module.exports = router;
