const express = require('express');
const { getTopics, getAllEndPoints } = require('./controllers/topics.controller');
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require('./controllers/errors.controller');
const { getArticlesById, getArticles } = require('./controllers/articles.controller');
const { getCommentsByArticleId } = require('./controllers/comments.controller');
const app = express();

app.get('/api/topics', getTopics)

app.get('/api', getAllEndPoints)

app.get('/api/articles/:article_id', getArticlesById)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.use(handlePsqlErrors)

app.use(handleCustomErrors)

app.use(handleServerErrors)

module.exports = app;