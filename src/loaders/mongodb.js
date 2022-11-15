const mongoose = require('mongoose');

const startDB = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_LOGIN || 'admin'}:${
      process.env.DB_PASSWORD || 'admin'
    }@cluster0.ml7wdi3.mongodb.net/database?retryWrites=true&w=majority`,
    {},
    (error) => {
      if (error) {
        console.log('Falha ao conectar com o MongoDB.');
        console.log('Erro:', error);
        return;
      }

      console.log('Conectado ao MongoDB.');
    }
  );
};

module.exports = startDB;
