const CommentModel = require('../Models/Comment');
const NotionModel = require('../Models/Notion');
const TrilhaModel = require('../Models/Trilha');

class NotionController {
  async store(req, res) {
    const trilhaID = req.body.trilha;
    const moduloID = req.body.modulo;

    try {
      const trilha = await TrilhaModel.findById(trilhaID);
      const modulo = trilha?.modules.find((modulo) => modulo.code == moduloID);

      if (!trilha || !modulo) {
        return res.status(404).json({ message: `${!trilha ? 'Trilha' : 'Modulo'} não existe` });
      }

      const newNotion = await NotionModel.create(req.body);

      return res.status(200).json(newNotion);
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: 'Erro ao criar notion' });
    }
  }

  async index(req, res) {
    const { id } = req.params;

    try {
      const notions = await NotionModel.find({ trilha: id });

      return res.status(200).json(notions);
    } catch (e) {
      return res.status(404).json({ message: 'Erro ao recuperar notions' });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const trilhaID = req.body.trilha;
    const moduloID = req.body.modulo;

    req.body.updatedAt = Date.now();

    try {
      const trilha = await TrilhaModel.findById(trilhaID);
      const modulo = trilha?.modules.find((modulo) => modulo.code == moduloID);

      if (!trilha || !modulo) {
        return res.status(404).json({ message: `${!trilha ? 'Trilha' : 'Modulo'} não existe` });
      }

      await NotionModel.findByIdAndUpdate(id, req.body);

      return res.status(200).json({ message: 'Notion atualizada' });
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: 'Falha ao atualizar notion' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const notionDeleted = await NotionModel.findByIdAndDelete(id);

      if (!notionDeleted) {
        return res.status(404).json({ message: 'Notion não existe' });
      }

      return res.status(200).json({ message: `Notion ${id} deletada com sucesso` });
    } catch (e) {
      return res.status(404).json({ message: 'Falha ao deletar notion' });
    }
  }

  async like(req, res) {
    const { id } = req.params;
    const userID = req.headers.user;

    try {
      let notion = await NotionModel.findById(id)
      const notionAlreadyHasLike = notion.likes?.find(like => like.id == userID)

      if(notion) {
        
        if(!notionAlreadyHasLike) {
          notion.unlikes = notion.unlikes.filter(unlike =>  unlike.id != userID)

          notion.likes.push({
            id: userID
          })

          await NotionModel.findByIdAndUpdate(id, notion);
          
          return res.status(201).json({
            message: `Curtida confirmada`
          })
        }

      notion.likes = notion.likes.filter(like =>  like.id != userID)

      await NotionModel.findByIdAndUpdate(id, notion);

      return res.status(201).json({
        message: `Curtida removida`
      })

      }

      return res.status(404).json({
          message: `Notion não existe`
      })

    } catch (e) {
      console.log(e);
      return res.status(500).json({
          message: `Erro ao dar like`,
          error: e.message
      })
    }
  }

  async unlike(req, res) {
    const { id } = req.params;
    const userID = req.headers.user;

    try {
      let notion = await NotionModel.findById(id)
      const notionAlreadyHasUnlike = notion.unlikes?.find(unlike => unlike.id == userID)

      if(notion) {

        if(!notionAlreadyHasUnlike) {
          notion.likes = notion.likes.filter(like =>  like.id != userID)

          notion.unlikes.push({
            id: userID
          })

          await NotionModel.findByIdAndUpdate(id, notion);
          
          return res.status(201).json({
            message: `Descurtida confirmada`
          })
        }

      notion.unlikes = notion.unlikes.filter(unlike =>  unlike.id != userID)

      await NotionModel.findByIdAndUpdate(id, notion);

      return res.status(201).json({
        message: `Descurtida removida`
      })

      }

      return res.status(404).json({
          message: `Notion não existe`
      })

    } catch (e) {
      console.log(e);
      return res.status(500).json({
          message: `Erro ao descurtir notion`,
          error: e.message
      })
    }
  }

  async comment(req, res) {
    const { id } = req.params;
    const userID = req.headers.user;

    req.body.author = userID
    req.body.notionID = id

    try {
      const notion = await NotionModel.findById(id);

      if(!notion) {
        return res.status(404).json({
          message: `Notion não existe`
        })
      }

     const newComment = await CommentModel.create(req.body);

     return res.status(201).json(newComment)

    } catch(e) {
      console.log(e);
      return res.status(500).json({
          message: `Erro ao comentar notion`,
          error: e.message
      })
    }

  }

  async indexComment(req, res) {
    const { id } = req.params;

    try {
      const comments = await CommentModel.find({ notionID: id });

      return res.status(200).json(comments);
    } catch (e) {
      return res.status(500).json({ message: 'Erro ao recuperar comentários' });
    }
    
  }

  async deleteComment(req, res) {
    const { id } = req.params;

    try {
      const commentDeleted = await CommentModel.findByIdAndDelete(id);

      if (!commentDeleted) {
        return res.status(404).json({ message: 'Comentário não existe' });
      }

      return res.status(200).json({ message: `Comentário ${id} deletado com sucesso` });
    } catch (e) {
      return res.status(500).json({ message: 'Falha ao deletar comentário' });
    }
  }
}

module.exports = new NotionController();
