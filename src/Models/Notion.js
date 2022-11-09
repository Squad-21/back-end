const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NotionSchema = new Schema({
  id: {
    type: ObjectId,
    immutable: true,
  },
  trilha: {
    type: String,
    required: true,
  },
  modulo: {
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
  likes: [
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
  unlikes: [
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
