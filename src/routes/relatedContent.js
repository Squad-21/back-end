const express = require('express');
const router = express.Router();
const RelatedContentController = require('../Controllers/RelatedContentController')
const authMiddleware = require('../middlewares/authenticate');
const loginMiddleware = require('../middlewares/login');

// Criar um novo conteúdo relacionado
router.post('/', authMiddleware, RelatedContentController.store);

// Deletar um conteúdo relacionado
router.delete('/:id', authMiddleware, RelatedContentController.delete);

// Atualizar um conteúdo relacionado
router.put('/:id', authMiddleware, RelatedContentController.update);

module.exports = router;