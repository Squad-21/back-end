const app = require('./app')
const port = 3000;
const Loaders = require('./loaders')

Loaders.start();

app.listen(port, () => console.log('Server is running...'))
