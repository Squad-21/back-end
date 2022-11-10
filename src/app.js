const express = require('express');
const cors = require('cors');

const app = express();
const coursesRouter = require('./routes/courses');
const lessonRouter = require('./routes/lessons');
const authRouter = require('./routes/users');
const healthRouter = require('./routes/health');
const apidocsRouter = require('./routes/apidocs');
const relatedRouter = require('./routes/relatedContent');

app.use(express.json());
app.use(cors());

app.use('/courses', coursesRouter);
app.use('/lessons', lessonRouter);
app.use('/auth', authRouter);
app.use('/related', relatedRouter);
app.use('/health', healthRouter);
app.use('/api-docs', apidocsRouter);

module.exports = app;
