const CommentModel = require('../Models/Comment');
const LessonModel = require('../Models/Lesson');
const CourseModel = require('../Models/Course');
const UserModel = require('../Models/User');

class LessonController {
  async store(req, res) {
    const courseID = req.body.course;
    const moduleID = req.body.module;

    try {
      const course = await CourseModel.findById(courseID);
      const module = course?.modules.find((module) => module.code == moduleID);

      if (!course || !module) return res.status(404).json({ message: `${!course ? 'Curso' : 'Módulo'} não existe.` });

      const newLesson = await LessonModel.create(req.body);

      return res.status(200).json(newLesson);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Erro ao criar aula.',
        error: e.message,
      });
    }
  }

  async index(req, res) {
    const { id } = req.params;

    try {
      const lessons = await LessonModel.find({ course: id });

      return res.status(200).json(lessons);
    } catch (e) {
      return res.status(500).json({
        message: 'Erro ao recuperar aulas.',
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

      if (!course || !module) return res.status(404).json({ message: `${!course ? 'Curso' : 'Módulo'} não existe.` });

      const newLesson = await LessonModel.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });

      return res.status(200).json(newLesson);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Erro ao atualizar aula.',
        error: e.message,
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const lessonDeleted = await LessonModel.findByIdAndDelete(id);

      if (!lessonDeleted) return res.status(404).json({ message: 'Aula não existe.' });

      return res.status(200).json({ message: `Aula "${id}" removida com sucesso.` });
    } catch (e) {
      return res.status(500).json({
        message: 'Erro ao remover aula.',
        error: e,
      });
    }
  }

  async like(req, res) {
    const { id } = req.params;
    const userID = req.headers.user;

    try {
      let lesson = await LessonModel.findById(id);
      const lessonAlreadyHasLike = lesson.likes?.find((like) => like.id == userID);

      if (!lesson)
        return res.status(404).json({
          message: `Aula não existe.`,
        });

      if (lessonAlreadyHasLike) {
        lesson.likes = lesson.likes.filter((like) => like.id != userID);

        await LessonModel.findByIdAndUpdate(id, lesson);

        return res.status(200).json({
          message: `Curtida removida.`,
          likes: lesson.likes,
        });
      }

      lesson.unlikes = lesson.unlikes.filter((unlike) => unlike.id != userID);

      lesson.likes.push({
        id: userID,
      });

      await LessonModel.findByIdAndUpdate(id, lesson);

      return res.status(200).json({
        message: `Curtida confirmada.`,
        likes: lesson.likes,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: `Erro ao curtir.`,
        error: e.message,
      });
    }
  }

  async unlike(req, res) {
    const { id } = req.params;
    const userID = req.headers.user;

    try {
      let lesson = await LessonModel.findById(id);
      const lessonAlreadyHasUnlike = lesson.unlikes?.find((unlike) => unlike.id == userID);

      if (!lesson)
        return res.status(404).json({
          message: `Aula não existe.`,
        });

      if (lessonAlreadyHasUnlike) {
        lesson.unlikes = lesson.unlikes.filter((unlike) => unlike.id != userID);

        await LessonModel.findByIdAndUpdate(id, lesson);

        return res.status(200).json({
          message: `Descurtida removida.`,
          unlikes: lesson.unlikes,
        });
      }

      lesson.likes = lesson.likes.filter((like) => like.id != userID);

      lesson.unlikes.push({
        id: userID,
      });

      await LessonModel.findByIdAndUpdate(id, lesson);

      return res.status(200).json({
        message: `Descurtida confirmada.`,
        unlikes: lesson.unlikes,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: `Erro ao descurtir aula.`,
        error: e.message,
      });
    }
  }

  async comment(req, res) {
    const { id } = req.params;
    const userID = req.headers.user;

    req.body.author = userID;
    req.body.lessonID = id;

    try {
      const lesson = await LessonModel.findById(id);

      if (!lesson)
        return res.status(404).json({
          message: `Aula não existe.`,
        });

      const newComment = await CommentModel.create(req.body);

      return res.status(201).json(newComment);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: `Erro ao comentar aula.`,
        error: e.message,
      });
    }
  }

  async indexComment(req, res) {
    const { id } = req.params;

    try {
      const comments = await CommentModel.find({ lessonID: id });

      return res.status(200).json(comments);
    } catch (e) {
      return res.status(500).json({
        message: 'Erro ao recuperar comentários.',
        error: e.message,
      });
    }
  }

  async deleteComment(req, res) {
    const { id } = req.params;

    try {
      const commentDeleted = await CommentModel.findByIdAndDelete(id);

      if (!commentDeleted) return res.status(404).json({ message: 'Comentário não existe.' });

      return res.status(200).json({ message: `Comentário "${id}" removido com sucesso.` });
    } catch (e) {
      return res.status(500).json({
        message: 'Erro ao remover comentário.',
        error: e.message,
      });
    }
  }

  async markAsDone(req, res) {
    const { id } = req.params;
    const userID = req.headers.user;

    try {
      const lesson = await LessonModel.findById(id);

      if (!lesson)
        return res.status(404).json({
          message: 'Aula não existe.',
        });

      let user = await UserModel.findById(userID);
      const lessonAlreadyHasBeenDone = user.lessons.find((lesson) => lesson.lessonID == id);

      if (!user)
        return res.status(404).json({
          message: 'Usuário não existe.',
        });

      if (lessonAlreadyHasBeenDone)
        return res.status(409).json({
          message: 'Aula já completada.',
        });

      user.lessons.push({
        lessonID: id,
        courseID: lesson.course,
        module: lesson.module,
        doneAt: () => Date.now(),
      });

      const userUpdated = await UserModel.findByIdAndUpdate(userID, user, { returnDocument: 'after' });

      return res.status(201).json(userUpdated);
    } catch (e) {
      return res.status(500).json({
        message: 'Erro ao marcar aula como completa.',
        error: e.message,
      });
    }
  }
}

module.exports = new LessonController();
