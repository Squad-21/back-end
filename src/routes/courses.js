const express = require('express');
const router = express.Router();
const CourseController = require('../Controllers/CourseController');
const ModuleController = require('../Controllers/ModuleController');
const authMiddleware = require('../middlewares/authenticate');

// Retornar todos os cursos
router.get('/', CourseController.index);

// Retornar um curso específico
router.get('/:id', CourseController.show);

// Adicionar um novo módulo
router.post('/:id/modules', authMiddleware, ModuleController.store);

// Remover um módulo
router.delete('/:id/modules/:code', authMiddleware, ModuleController.delete);

// Atualizar um módulo
router.put('/:id/modules/:code', authMiddleware, ModuleController.update);

// Adicionar um novo curso
router.post('/', authMiddleware, CourseController.store);

// Atualizar um curso específico
router.put('/:id', authMiddleware, CourseController.update);

// Remover um curso específico
router.delete('/:id', authMiddleware, CourseController.delete);

module.exports = router;
