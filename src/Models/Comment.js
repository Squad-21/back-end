const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
  lessonID: {
    type: ObjectId,
    ref: 'lessons',
    required: true,
  },
  author: {
    type: ObjectId,
    ref: 'users',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const CommentModel = mongoose.model('comments', CommentSchema);

module.exports = CommentModel;
