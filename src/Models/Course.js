const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    default: {
      public_id: 'default_course_u489iq',
      url: 'https://res.cloudinary.com/dnh07moob/image/upload/v1668204845/curso/default_course_u489iq.jpg',
    },
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  modules: {
    type: [
      {
        code: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const CourseModel = mongoose.model('courses', CourseSchema);

module.exports = CourseModel;
