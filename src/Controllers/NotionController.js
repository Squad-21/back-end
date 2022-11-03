const NotionModel = require('../Models/Notion')

class NotionController {
    async store(req, res) {
        const newNotion = await NotionModel.create(req.body)

        return res.status(200).json(newNotion)
    }

    async index(req, res) {
        const {id} = req.params;
        
        try {
            const notions = await NotionModel.find({trilha: id})

            return res.status(200).json(notions)
        } catch(e) {
            return res.status(404).json({message: 'Erro ao recuperar notions'})
        }
    }

    async update(req, res) {
        const {id} = req.params;

        try {

            await NotionModel.findByIdAndUpdate(id, req.body)

            return res.status(200).json({message: 'Notion atualizada'})

        } catch(e) {
            console.log(e)
            return res.status(404).json({message: 'Falha ao atualizar notion'})
        }

    }

    async delete(req, res) {
        const {id} = req.params;
        try {

            const notionDeleted = await NotionModel.findByIdAndDelete(id)

            if(!notionDeleted) {
                return res.status(404).json({message: 'Notion não existe'})
            }

            return res.status(200).json({message: `Notion ${id} deletada com sucesso`})

        } catch(e) {
            return res.status(404).json({message: 'Falha ao deletar notion'})
        }
    }
}

module.exports = new NotionController();