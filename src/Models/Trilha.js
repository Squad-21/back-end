const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TrilhaSchema = new Schema({
    id: ObjectId,
    title: String,
    description: String,
    modules: [{
        code: Number,
        title: String,
        description: String
    }]
});

const TrilhaModel = mongoose.model('trilhas', TrilhaSchema)

module.exports = TrilhaModel