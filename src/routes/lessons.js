const express = require('express');
const router = express.Router();
const LessonController = require('../Controllers/LessonController');
const authMiddleware = require('../middlewares/authenticate');
const loginMiddleware = require('../middlewares/login');

// Retornar todas as aulas de um curso  - TODO
router.get('/:id', LessonController.index);

// Dar um 'like' em uma aula - TODO
router.post('/:id/like', loginMiddleware, LessonController.like);

// Dar um 'unlike' em uma aula  - TODO
router.post('/:id/unlike', loginMiddleware, LessonController.unlike);

// Deixar um comentário em uma aula - TODO
router.post('/:id/comment', loginMiddleware, LessonController.comment);

// Retorna todos os comentários de uma aula - TODO
router.get('/:id/comment', loginMiddleware, LessonController.indexComment);

// Deletar comentário de uma lesson - TODO ??? qual a diferenca entre essa e a de baixo
router.delete('/:id/comment', authMiddleware, LessonController.deleteComment);

// Remover comentário de uma lesson - TODO ??? qual a diferenca entre essa e a de cima
router.post('/:id/done', loginMiddleware, LessonController.markAsDone);

// Adicionar uma nova aula - TODO
router.post('/', authMiddleware, LessonController.store);

// Atualizar uma aula específica - TODO
router.put('/:id', authMiddleware, LessonController.update);

// Remover uma aula específica - TODO
router.delete('/:id', authMiddleware, LessonController.delete);

module.exports = router;
