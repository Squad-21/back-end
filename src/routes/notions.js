const express = require('express');
const router = express.Router();
const NotionController = require('../Controllers/NotionController');

// Retornar os notions de uma trilha
router.get('/:id', (req, res) => {
  res.send(`GET NOTION ${req.params.id}`);
});

// Adicionar nova notion
router.post('/', (req, res) => {
  res.send('POST NOTION');
});

// Atualizar uma notion específica
router.put('/:id', (req, res) => {
  res.send(`PUT NOTION ${req.params.id}`);
});

// Deletar uma notion específica
router.delete('/:id', (req, res) => {
  res.send(`DELETE NOTION ${req.params.id}`);
});

module.exports = router;
