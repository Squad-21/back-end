const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const DBuser = 'admin';
const DBpassword = 'admin';

// middleware para ler JSON
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())

// Rotas 
app.get('/', (req, res) => {
  res.json({message: 'Hello world'})
});

// Listen
mongoose.connect(`mongodb+srv://${DBuser}:${DBpassword}@cluster0.ml7wdi3.mongodb.net/database?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((e) => console.log(e))
