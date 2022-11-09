const RelatedContentModel = require('../Models/RelatedContent');

class RelatedContentController {
  async store(req, res) {
    try {
      const newRelatedContent = await RelatedContentModel.create(req.body);

      return res.status(201).json(newRelatedContent);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Erro ao criar conteúdo',
        error: e,
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    req.body.updatedAt = Date.now();

    try {
      await RelatedContentModel.findByIdAndUpdate(id, req.body);

      return res.status(201).json({ message: 'Conteúdo relacionado atualizado' });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Falha ao atualizar conteúdo relacionado' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await RelatedContentModel.findByIdAndDelete(id);

      if (!deleted) return res.status(404).json({ message: 'Conteúdo relacionado não existe' });

      return res.status(200).json({ message: `Conteúdo relacionado ${id} deletado com sucesso` });
    } catch (e) {
      return res.status(500).json({ message: 'Falha ao deletar conteúdo relacionado' });
    }
  }
}

module.exports = new RelatedContentController();
