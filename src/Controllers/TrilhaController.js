const NotionModel = require('../Models/Notion');
const RelatedContentModel = require('../Models/RelatedContent');
const TrilhaModel = require('../Models/Trilha');
const NotionController = require('./NotionController');

class TrilhaController {
  async store(req, res) {
    try {
      const newTrilha = await TrilhaModel.create(req.body);

      return res.status(200).json(newTrilha);
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: 'Erro ao criar trilha' });
    }
  }

  async index(req, res) {
    try {
      const trilhas = await TrilhaModel.find();

      return res.status(200).json(trilhas);
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: 'Erro ao obter trilhas' });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      let trilha = await TrilhaModel.findById(id);
      const relatedContents = await RelatedContentModel.find({ trilhas: { $in: id } });
      const notions = await NotionModel.find({ trilha: id });

      if (!trilha) {
        return res.status(404).json({ message: 'Trilha não existe' });
      }

      return res.status(200).json({
        trilha: trilha,
        notions: notions,
        related: relatedContents,
      });
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: 'Trilha não existe' });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    req.body.updatedAt = Date.now();

    try {
      await TrilhaModel.findByIdAndUpdate(id, req.body);

      return res.status(200).json({ message: 'Trilha atualizada' });
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: 'Falha ao atualizar trilha' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const trilhaDeleted = await TrilhaModel.findByIdAndDelete(id);

      if (!trilhaDeleted) {
        return res.status(404).json({ message: 'Trilha não existe' });
      }

      return res.status(200).json({ message: `Trilha ${id} deletada com sucesso` });
    } catch (e) {
      return res.status(404).json({ message: 'Falha ao deletar trilha' });
    }
  }
}

module.exports = new TrilhaController();
