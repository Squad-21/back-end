const express = require('express');
const router = express.Router();
const CourseController = require('../Controllers/CourseController');
const ModuleController = require('../Controllers/ModuleController');
const authMiddleware = require('../middlewares/authenticate');

// Retornar todos os cursos
router.get('/', CourseController.index);

// Retornar um courso específico
router.get('/:id', CourseController.show);

// Adicionar novo módulo
router.post('/:id/modules', authMiddleware, ModuleController.store);

// Deletar um módulo
router.delete('/:id/modules/:code', authMiddleware, ModuleController.delete);

// Atualizar um módulo
router.put('/:id/modules/:code', authMiddleware, ModuleController.update);

// Adicionar novo courso
router.post('/', authMiddleware, CourseController.store);

// Atualizar um courso específico
router.put('/:id', authMiddleware, CourseController.update);

// Remover um courso específico
router.delete('/:id', authMiddleware, CourseController.delete);

module.exports = router;
