const express = require('express');
const router = express.Router();
const CourseController = require('../Controllers/CourseController');
const authMiddleware = require('../middlewares/authenticate');

// Retornar todas as courses
router.get('/', CourseController.index);

// Retornar uma course específica
router.get('/:id', CourseController.show);

// Adicionar nova course
router.post('/', authMiddleware, CourseController.store);

// Atualizar uma course específica
router.put('/:id', authMiddleware, CourseController.update);

// Deletar uma course específica
router.delete('/:id', authMiddleware, CourseController.delete);

module.exports = router;
