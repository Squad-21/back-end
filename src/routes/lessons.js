const express = require('express');
const router = express.Router();
const LessonController = require('../Controllers/LessonController');
const authMiddleware = require('../middlewares/authenticate');
const loginMiddleware = require('../middlewares/login');

// Retornar os lessons de uma course  - TODO
router.get('/:id', LessonController.index);

// Dá like numa lesson  - TODO
router.post('/:id/like', loginMiddleware, LessonController.like);

// Dá unlike numa lesson  - TODO
router.post('/:id/unlike', loginMiddleware, LessonController.unlike);

// Comentar em uma lesson- OK
router.post('/:id/comment', loginMiddleware, LessonController.comment);

// Retornar comentários de uma lesson - OK
router.get('/:id/comment', loginMiddleware, LessonController.indexComment);

// Deletar comentário de uma lesson - TODO
router.delete('/:id/comment', authMiddleware, LessonController.deleteComment);

// Remover comentário de uma lesson - TODO
router.post('/:id/done', loginMiddleware, LessonController.markAsDone);

// Adicionar nova lesson - OK
router.post('/', authMiddleware, LessonController.store);

// Atualizar uma lesson específica - OK
router.put('/:id', authMiddleware, LessonController.update);

// Deletar uma lesson específica - OK
router.delete('/:id', authMiddleware, LessonController.delete);

module.exports = router;
