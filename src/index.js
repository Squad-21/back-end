const app = require('./app');
const Loaders = require('./loaders');
const port = process.env.PORT || 3000;

Loaders.start();

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
