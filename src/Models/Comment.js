const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
  id: {
    type: ObjectId,
    immutable: true,
  },
  notionID: {
    type: ObjectId,
    ref: 'notions',
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
