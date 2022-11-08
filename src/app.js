const express = require('express');
const cors = require('cors');

const app = express();
const trilhasRouter = require('./routes/trilhas');
const notionRouter = require('./routes/notions');
const authRouter = require('./routes/users')
const healthRouter = require('./routes/health');
const apidocsRouter = require('./routes/apidocs');
const relatedRouter = require('./routes/relatedContent')

app.use(express.json());
app.use(cors());

app.use('/trilhas', trilhasRouter);
app.use('/notions', notionRouter);
app.use('/auth', authRouter);
app.use('/related', relatedRouter);
app.use('/health', healthRouter);
app.use('/api-docs', apidocsRouter);

module.exports = app;
