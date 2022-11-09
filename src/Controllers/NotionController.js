const CommentModel = require('../Models/Comment');
const NotionModel = require('../Models/Notion');
const CourseModel = require('../Models/Course');
const UserModel = require('../Models/User');

class NotionController {
  async store(req, res) {
    const courseID = req.body.course;
    const moduleID = req.body.module;

    try {
      const course = await CourseModel.findById(courseID);
      const module = course?.modules.find((module) => module.code == moduleID);

      if (!course || !module) return res.status(404).json({ message: `${!course ? 'Course' : 'Module'} não existe` });

      const newNotion = await NotionModel.create(req.body);

      return res.status(200).json(newNotion);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Erro ao criar notion',
        error: e.message,
      });
    }
  }

  async index(req, res) {
    const { id } = req.params;

    try {
      const notions = await NotionModel.find({ course: id });

      return res.status(200).json(notions);
    } catch (e) {
      return res.status(500).json({
        message: 'Erro ao recuperar notions',
        error: e.message,
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const courseID = req.body.course;
    const moduleID = req.body.module;

    req.body.updatedAt = Date.now();

    try {
      const course = await CourseModel.findById(courseID);
      const module = course?.modules.find((module) => module.code == moduleID);

      if (!course || !module) return res.status(404).json({ message: `${!course ? 'Course' : 'Module'} não existe` });

      const newNotion = await NotionModel.findByIdAndUpdate(id, req.body);

      return res.status(200).json(newNotion);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Falha ao atualizar notion',
        error: e.message,
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const notionDeleted = await NotionModel.findByIdAndDelete(id);

      if (!notionDeleted) return res.status(404).json({ message: 'Notion não existe' });

      return res.status(200).json({ message: `Notion ${id} deletada com sucesso` });
    } catch (e) {
      return res.status(500).json({
        message: 'Falha ao deletar notion',
        error: e,
      });
    }
  }

  async like(req, res) {
    const { id } = req.params;
    const userID = req.headers.user;

    try {
      let notion = await NotionModel.findById(id);
      const notionAlreadyHasLike = notion.likes?.find((like) => like.id == userID);

      if (!notion)
        return res.status(404).json({
          message: `Notion não existe`,
        });

      if (notionAlreadyHasLike) {
        notion.likes = notion.likes.filter((like) => like.id != userID);

        await NotionModel.findByIdAndUpdate(id, notion);

        return res.status(200).json({
          message: `Curtida removida`,
          likes: notion.likes,
        });
      }

      notion.unlikes = notion.unlikes.filter((unlike) => unlike.id != userID);

      notion.likes.push({
        id: userID,
      });

      await NotionModel.findByIdAndUpdate(id, notion);

      return res.status(200).json({
        message: `Curtida confirmada`,
        likes: notion.likes,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: `Erro ao dar like`,
        error: e.message,
      });
    }
  }

  async unlike(req, res) {
    const { id } = req.params;
    const userID = req.headers.user;

    try {
      let notion = await NotionModel.findById(id);
      const notionAlreadyHasUnlike = notion.unlikes?.find((unlike) => unlike.id == userID);

      if (!notion)
        return res.status(404).json({
          message: `Notion não existe`,
        });

      if (notionAlreadyHasUnlike) {
        notion.unlikes = notion.unlikes.filter((unlike) => unlike.id != userID);

        await NotionModel.findByIdAndUpdate(id, notion);

        return res.status(200).json({
          message: `Descurtida removida`,
          unlikes: notion.unlikes,
        });
      }

      notion.likes = notion.likes.filter((like) => like.id != userID);

      notion.unlikes.push({
        id: userID,
      });

      await NotionModel.findByIdAndUpdate(id, notion);

      return res.status(200).json({
        message: `Descurtida confirmada`,
        unlikes: notion.unlikes,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: `Erro ao descurtir notion`,
        error: e.message,
      });
    }
  }

  async comment(req, res) {
    const { id } = req.params;
    const userID = req.headers.user;

    req.body.author = userID;
    req.body.notionID = id;

    try {
      const notion = await NotionModel.findById(id);

      if (!notion)
        return res.status(404).json({
          message: `Notion não existe`,
        });

      const newComment = await CommentModel.create(req.body);

      return res.status(201).json(newComment);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: `Erro ao comentar notion`,
        error: e.message,
      });
    }
  }

  async indexComment(req, res) {
    const { id } = req.params;

    try {
      const comments = await CommentModel.find({ notionID: id });

      return res.status(200).json(comments);
    } catch (e) {
      return res.status(500).json({
        message: 'Erro ao recuperar comentários',
        error: e.message,
      });
    }
  }

  async deleteComment(req, res) {
    const { id } = req.params;

    try {
      const commentDeleted = await CommentModel.findByIdAndDelete(id);

      if (!commentDeleted) return res.status(404).json({ message: 'Comentário não existe' });

      return res.status(200).json({ message: `Comentário ${id} deletado com sucesso` });
    } catch (e) {
      return res.status(500).json({
        message: 'Falha ao deletar comentário',
        error: e.message,
      });
    }
  }

  async markAsDone(req, res) {
    const { id } = req.params;
    const userID = req.headers.user;

    try {
      const notion = await NotionModel.findById(id);

      if (!notion)
        return res.status(404).json({
          message: 'Notion não existe',
        });

      let user = await UserModel.findById(userID);
      const notionAlreadyHasBeenDone = user.notions.find((notion) => notion.notionID == id);

      if (!user)
        return res.status(404).json({
          message: 'Usuário não existe',
        });

      if (notionAlreadyHasBeenDone)
        return res.status(409).json({
          message: 'Notion já completa',
        });

      user.notions.push({
        notionID: id,
        courseID: notion.course,
        module: notion.module,
        doneAt: () => Date.now(),
      });

      const userUpdated = await UserModel.findByIdAndUpdate(userID, user);

      return res.status(201).json(userUpdated);
    } catch (e) {
      return res.status(500).json({
        message: 'Falha ao marcar notion como completa',
        error: e.message,
      });
    }
  }
}

module.exports = new NotionController();
