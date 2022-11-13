const LessonModel = require('../Models/Lesson');
const RelatedContentModel = require('../Models/RelatedContent');
const CourseModel = require('../Models/Course');

const uploadImage = async (image = File) => {
  const result = await cloudinary.uploader.upload(image, {
    folder: 'curso',
  });

  return {
    public_id: result.public_id,
    url: result.secure_url,
  };
};

class CourseController {
  async store(req, res) {
    try {

      if(req.body.image) {
        const imageUploaded = await uploadImage(req.body.image);
        req.body.image = {
          public_id: imageUploaded.public_id,
          url: imageUploaded.url
        }
      }
      const newCourse = await CourseModel.create(req.body);

      return res.status(201).json(newCourse);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Erro ao criar curso.',
        error: e.message,
      });
    }
  }

  async index(req, res) {
    try {
      const courses = await CourseModel.find();

      return res.status(200).json(courses);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Erro ao obter cursos.',
        error: e.message,
      });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      let course = await CourseModel.findById(id);
      const relatedContents = await RelatedContentModel.find({ courses: { $in: id } });
      const lessons = await LessonModel.find({ course: id });

      if (!course) return res.status(404).json({ message: 'Curso não existe' });

      return res.status(200).json({
        course: course,
        lessons: lessons,
        related: relatedContents,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Curso não existe.',
        error: e.message,
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    req.body.updatedAt = Date.now();

    try {
      const newCourse = await CourseModel.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });

      return res.status(200).json(newCourse);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Erro ao atualizar curso.',
        error: e.message,
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const courseDeleted = await CourseModel.findByIdAndDelete(id);

      if (!courseDeleted) return res.status(404).json({ message: 'Curso não existe.' });

      return res.status(200).json({ message: `Curso ${id} removido com sucesso.` });
    } catch (e) {
      return res.status(500).json({
        message: 'Erro ao remover curso.',
        error: e.message,
      });
    }
  }
}

module.exports = new CourseController();
