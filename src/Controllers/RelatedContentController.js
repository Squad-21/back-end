const RelatedContentModel = require('../Models/RelatedContent');

class RelatedContentController {
  async store(req, res) {
    try {
      const newRelatedContent = await RelatedContentModel.create(req.body);

      return res.status(201).json(newRelatedContent);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Erro ao criar conteúdo.',
        error: e.message,
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    req.body.updatedAt = Date.now();

    try {
      const newRelated = await RelatedContentModel.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        returnDocument: 'after',
      });

      return res.status(200).json(newRelated);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Erro ao atualizar conteúdo relacionado.',
        error: e.message,
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await RelatedContentModel.findByIdAndDelete(id);

      if (!deleted) return res.status(404).json({ message: 'Conteúdo relacionado não existe.' });

      return res.status(200).json({ message: `Conteúdo relacionado ${id} removido com sucesso.` });
    } catch (e) {
      return res.status(500).json({
        message: 'Erro ao remover conteúdo relacionado.',
        error: e.message,
      });
    }
  }
}

module.exports = new RelatedContentController();
