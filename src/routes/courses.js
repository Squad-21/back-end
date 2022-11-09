const express = require('express');
const router = express.Router();
const CourseController = require('../Controllers/CourseController');
const authMiddleware = require('../middlewares/authenticate');

// Retornar todos os cursos
router.get('/', CourseController.index);

// Retornar um courso específico
router.get('/:id', CourseController.show);

// Adicionar novo courso
router.post('/', authMiddleware, CourseController.store);

// Atualizar um courso específico
router.put('/:id', authMiddleware, CourseController.update);

// Remover um courso específico
router.delete('/:id', authMiddleware, CourseController.delete);

module.exports = router;
