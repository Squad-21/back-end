const express = require('express');
const router = express.Router();
const LessonController = require('../Controllers/LessonController');
const authMiddleware = require('../middlewares/authenticate');
const loginMiddleware = require('../middlewares/login');

// Retornar todas as aulas de um curso  - OK
router.get('/:id', LessonController.index);

// Dar um 'like' em uma aula - OK
router.post('/:id/like', loginMiddleware, LessonController.like);

// Dar um 'unlike' em uma aula  - OK
router.post('/:id/unlike', loginMiddleware, LessonController.unlike);

// Deixar um comentário em uma aula - OK
router.post('/:id/comment', loginMiddleware, LessonController.comment);

//  Retorna todos os comentários de uma aula - OK
router.get('/:id/comment', loginMiddleware, LessonController.indexComment);

// Remover um comentário de uma aula - OK
router.delete('/:id/comment', authMiddleware, LessonController.deleteComment);

// Marcar aula como completa. - OK
router.post('/:id/done', loginMiddleware, LessonController.markAsDone);

// TODO: Marcar aula que já foi completada como incompleta caso o ususário queira fazer o curso mais uma vez.

// Adicionar uma nova aula - OK
router.post('/', authMiddleware, LessonController.store);

// Atualizar uma aula específica - OK
router.put('/:id', authMiddleware, LessonController.update);

// Remover uma aula específica - OK
router.delete('/:id', authMiddleware, LessonController.delete);

module.exports = router;
