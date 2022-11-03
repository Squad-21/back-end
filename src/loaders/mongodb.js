const mongoose = require('mongoose');
require('dotenv').config();

const startDB = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.ml7wdi3.mongodb.net/database?retryWrites=true&w=majority`
  );
};

module.exports = startDB;
