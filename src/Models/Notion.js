const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NotionSchema = new Schema({
    id: ObjectId,
    trilha: String,
    modulo: Number,
    title: String,
    type: String,
    author: String,
    duration: String,
    content: String,
});

const NotionModel = mongoose.model('notions', NotionSchema)

module.exports = NotionModel