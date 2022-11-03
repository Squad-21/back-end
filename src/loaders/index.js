const startDB = require('./mongodb');
require('dotenv').config();

class Loaders {
  start() {
    startDB();
  }
}

module.exports = new Loaders();
