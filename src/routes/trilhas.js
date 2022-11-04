const express = require('express');
const router = express.Router();
const TrilhaController = require('../Controllers/TrilhaController');

// Retornar todas as trilhas
router.get('/', (req, res) => {
  res.send('GET TRILHAS');
});

// Retornar uma trilha específica
router.get('/:id', (req, res) => {
  res.send(`GET TRILHA ID: ${req.params.id}`);
});

// Adicionar nova trilha
router.post('/', (req, res) => {
  res.send('POST TRILHA');
});

// Atualizar uma trilha específica
router.put('/:id', (req, res) => {
  res.send(`PUT TRILHA ID: ${req.params.id}`);
});

// Deletar uma trilha específica
router.delete('/:id', (req, res) => {
  res.send(`DELETE TRILHA ID: ${req.params.id}`);
});

module.exports = router;
