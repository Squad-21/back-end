const express = require('express');
const app = express();
const trilhasRouter = require('./routes/trilhas');
const notionRouter = require('./routes/notions');
const healthRouter = require('./routes/health');

app.use(express.json());
app.use('/trilhas', trilhasRouter);
app.use('/notions', notionRouter);
app.use('/health', healthRouter);
module.exports = app;
