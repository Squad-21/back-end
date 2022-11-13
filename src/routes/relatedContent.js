const express = require('express');
const router = express.Router();
const RelatedContentController = require('../Controllers/RelatedContentController');
const authMiddleware = require('../middlewares/authenticate');
const loginMiddleware = require('../middlewares/login');

// Adicionar um novo conteúdo relacionado - //TODO: EXEMPLO MELHOR DE POST NA DOCUMENTAÇÃO
router.post('/', authMiddleware, RelatedContentController.store);

// Remover um conteúdo relacionado - OK
router.delete('/:id', authMiddleware, RelatedContentController.delete);

// Atualizar um conteúdo relacionado - OK
router.put('/:id', authMiddleware, RelatedContentController.update);

module.exports = router;
