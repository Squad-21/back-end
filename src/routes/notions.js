const express = require('express');
const router = express.Router();
const NotionController = require('../Controllers/NotionController');
const authMiddleware = require('../middlewares/authenticate');
const loginMiddleware = require('../middlewares/login');

// Retornar os notions de uma trilha
router.get('/:id', NotionController.index);

// Dá like numa notion
router.post('/:id/like', loginMiddleware, NotionController.like);

// Dá unlike numa notion
router.post('/:id/unlike', loginMiddleware, NotionController.unlike);

// Comenta em uma notion
router.post('/:id/comment', loginMiddleware, NotionController.comment);

// Retornar comentários de uma notion
router.get('/:id/comment', loginMiddleware, NotionController.indexComment);

// Deletar comentário de uma notion
router.delete('/:id/comment', authMiddleware, NotionController.deleteComment);

// Adicionar nova notion
router.post('/', authMiddleware, NotionController.store);

// Atualizar uma notion específica
router.put('/:id', authMiddleware, NotionController.update);

// Deletar uma notion específica
router.delete('/:id', authMiddleware, NotionController.delete);

module.exports = router;
