const express = require('express');
const { getTopics, getAllEndPoints } = require('./controllers/topics.controller');
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require('./controllers/errors.controller');
const { getArticlesById, getArticles, updateArticle } = require('./controllers/articles.controller');
const { getCommentsByArticleId, postComment, deleteCommentById } = require('./controllers/comments.controller');
const app = express();
app.use(express.json());

app.get('/api/topics', getTopics)

app.get('/api', getAllEndPoints)

app.get('/api/articles/:article_id', getArticlesById)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.post('/api/articles/:article_id/comments', postComment)

app.patch('/api/articles/:article_id', updateArticle)

app.delete('/api/comments/:comment_id', deleteCommentById)

app.use(handlePsqlErrors)

app.use(handleCustomErrors)

app.use(handleServerErrors)

module.exports = app;