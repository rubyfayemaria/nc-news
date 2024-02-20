const express = require('express');
const { getTopics, getAllEndPoints } = require('./controllers/topics.controller');
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require('./controllers/errors.controller');
const { getArticlesById } = require('./controllers/articles.controller');
const app = express();

app.get('/api/topics', getTopics)

app.get('/api', getAllEndPoints)

app.get('/api/articles/:article_id', getArticlesById)

app.use(handlePsqlErrors)

app.use(handleCustomErrors)

app.use(handleServerErrors)

module.exports = app;