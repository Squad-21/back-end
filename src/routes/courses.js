const express = require('express');
const router = express.Router();
const CourseController = require('../Controllers/CourseController');
const ModuleController = require('../Controllers/ModuleController');
const authMiddleware = require('../middlewares/authenticate');

// Retornar todos os cursos - OK
router.get('/', CourseController.index);

// Retornar um curso específico - OK
router.get('/:id', CourseController.show);

// Adicionar um novo módulo - OK
router.post('/:id/modules', authMiddleware, ModuleController.store);

// Remover um módulo - OK
router.delete('/:id/modules/:code', authMiddleware, ModuleController.delete);

// Atualizar um módulo - OK
router.put('/:id/modules/:code', authMiddleware, ModuleController.update);

// Adicionar um novo curso - OK
router.post('/', authMiddleware, CourseController.store);

// Atualizar um curso específico - OK
router.put('/:id', authMiddleware, CourseController.update);

// Remover um curso específico - OK
router.delete('/:id', authMiddleware, CourseController.delete);

module.exports = router;
