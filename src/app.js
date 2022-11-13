const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const coursesRouter = require('./routes/courses');
const lessonRouter = require('./routes/lessons');
const authRouter = require('./routes/users');
const healthRouter = require('./routes/health');
const apidocsRouter = require('./routes/apidocs');
const relatedRouter = require('./routes/relatedContent');

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/courses', coursesRouter);
app.use('/lessons', lessonRouter);
app.use('/auth', authRouter);
app.use('/related', relatedRouter);
app.use('/health', healthRouter);
app.use('/api-docs', apidocsRouter);

module.exports = app;
