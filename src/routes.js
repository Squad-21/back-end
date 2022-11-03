const {Router} = require('express');
const NotionController = require('./Controllers/NotionController');
const TrilhaController = require('./Controllers/TrilhaController')
const routes = Router();

// Retornar status do server
routes.get('/health', (req, res) => {
    return res.status(200).json({message: "Server is running..."})
})

// Adicionar nova trilha
routes.post('/trilhas', TrilhaController.store)

// Retornar todas as trilhas
routes.get('/trilhas', TrilhaController.index)

// Retornar uma trilha específica
routes.get('/trilhas/:id', TrilhaController.show)

// Atualizar uma trilha específica
routes.put('/trilhas/:id', TrilhaController.update)

// Deletar uma trilha específica
routes.delete('/trilhas/:id', TrilhaController.delete)

// Adicionar nova notion
routes.post('/notions', NotionController.store)

// Retornar os notions de umma trilha
routes.get('/notions/:id', NotionController.index)

// Atualizar uma notion específica
routes.put('/notions/:id', NotionController.update)

// Deletar uma notion específica
routes.delete('/notions/:id', NotionController.delete)

module.exports = routes;