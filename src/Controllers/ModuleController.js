const CourseModel = require('../Models/Course');

class ModuleController {
  async store(req, res) {
    const { id } = req.params;

    try {
      let course = await CourseModel.findById(id);

      let highestCode = Math.max(...course.modules.map((module) => module.code));
      req.body.code = highestCode + 1;

      course.modules.push(req.body);
      course.updatedAt = Date.now();

      const newCourse = await CourseModel.findByIdAndUpdate(id, course, { returnDocument: 'after' });

      return res.status(201).json(newCourse);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Erro ao adicionar módulo.',
        error: e.message,
      });
    }
  }

  async update(req, res) {
    const { id, code } = req.params;
    const { title, description } = req.body;

    try {
      let course = await CourseModel.findById(id);
      const module = course.modules.find((module) => module.code == code);
      const moduleIndex = course.modules.indexOf(module);

      course.modules[moduleIndex].title = title;
      course.modules[moduleIndex].description = description;
      course.updatedAt = Date.now();

      const newCourse = await CourseModel.findByIdAndUpdate(id, course, { returnDocument: 'after' });

      return res.status(200).json(newCourse);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Erro ao excluir módulo.',
        error: e.message,
      });
    }
  }

  async delete(req, res) {
    const { id, code } = req.params;

    try {
      let course = await CourseModel.findById(id);

      course.modules = course.modules.filter((module) => module.code != code);
      course.updatedAt = Date.now();

      const newCourse = await CourseModel.findByIdAndUpdate(id, course, { returnDocument: 'after' });

      return res.status(200).json(newCourse);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Erro ao excluir módulo.',
        error: e.message,
      });
    }
  }
}

module.exports = new ModuleController();
