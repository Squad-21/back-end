const TrilhaModel = require('../Models/Trilha')

class TrilhaController {
    async store(req, res) {
        const newTrilha = await TrilhaModel.create(req.body)

        return res.status(200).json(newTrilha)
    }

    async index(req, res) {
        const trilhas = await TrilhaModel.find()

        return res.status(200).json(trilhas)
    }

    async show(req, res) {
        const {id} = req.params;

        try {
            const trilha = await TrilhaModel.findById(id)

            if(!trilha) {
                return res.status(404).json({message: 'Trilha não existe'})
            }
    
            return res.status(200).json(trilha)
        }
        catch(e) {
            console.log(e)
            return res.status(404).json({message: 'Trilha não existe'})
        }

    }

    async update(req, res) {
        const {id} = req.params;

        try {

            await TrilhaModel.findByIdAndUpdate(id, req.body)

            return res.status(200).json({message: 'Trilha atualizada'})

        } catch(e) {
            console.log(e)
            return res.status(404).json({message: 'Falha ao atualizar trilha'})
        }

    }

    async delete(req, res) {
        const {id} = req.params;
        try {

            const trilhaDeleted = await TrilhaModel.findByIdAndDelete(id)

            if(!trilhaDeleted) {
                return res.status(404).json({message: 'Trilha não existe'})
            }

            return res.status(200).json({message: `Trilha ${id} deletada com sucesso`})

        } catch(e) {
            return res.status(404).json({message: 'Falha ao deletar trilha'})
        }
    }
}

module.exports = new TrilhaController();