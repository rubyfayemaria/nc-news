const { selectArticleById, selectArticles, updateVotes } = require("../models/articles.model");

exports.getArticlesById = (req, res, next) => {
    const {article_id} = req.params;
    selectArticleById(article_id)
    .then((article) => 
        res.status(200).send({ article }))
    .catch((err) => {
        next(err);
    })
}

exports.getArticles = (req, res, next) => {
    selectArticles()
    .then((articles) => {
        res.status(200).send(articles)
    })
    .catch((err) => {
        next(err);
    })
}

exports.updateArticle = (req, res, next) => {
    const {article_id} = req.params;
    const newVotes = req.body.inc_votes;
    updateVotes(article_id, newVotes)
    .then((updateArticle) => {
        res.status(200).send(updateArticle)
    })
    .catch((err) => {
        next(err);
    })
}
