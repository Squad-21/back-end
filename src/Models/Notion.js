const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NotionSchema = new Schema({
  course: {
    type: ObjectId,
    ref: 'courses',
    required: true,
  },
  module: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: [
      {
        id: {
          type: ObjectId,
          ref: 'users',
        },
        date: {
          type: Date,
          default: () => Date.now(),
        },
      },
    ],
    default: [],
  },
  unlikes: {
    type: [
      {
        id: {
          type: ObjectId,
          ref: 'users',
        },
        date: {
          type: Date,
          default: () => Date.now(),
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

const NotionModel = mongoose.model('notions', NotionSchema);

module.exports = NotionModel;
