const express = require('express');
const { getTopics, getAllEndPoints } = require('./controllers/app.controller');
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require('./errors');
const app = express();

app.get('/api/topics', getTopics)

app.get('/api', getAllEndPoints)

app.use(handlePsqlErrors)

app.use(handleCustomErrors)

app.use(handleServerErrors)

module.exports = app;