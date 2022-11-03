const mongoose = require('mongoose');
const DBuser = 'admin';
const DBpassword = 'admin';

const startDB = async() => {
    await mongoose.connect(`mongodb+srv://${DBuser}:${DBpassword}@cluster0.ml7wdi3.mongodb.net/database?retryWrites=true&w=majority`)
}

module.exports = startDB