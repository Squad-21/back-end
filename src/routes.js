const {Router} = require('express')
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

module.exports = routes;