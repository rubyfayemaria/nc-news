const { insertComment, deleteComment } = require("../models/comments.model");
const { selectCommentsById } = require("../models/comments.model");

exports.getCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params
    selectCommentsById(article_id)
    .then((comments) => {
        res.status(200).send(comments)
    })
    .catch((err) => {
        next(err);
    })
}

exports.postComment = (req, res, next) => {
    const {article_id} = req.params;
    const {username, body} = req.body;
    insertComment(article_id, username, body)
    .then((comment) => {
        res.status(201).send({comment});
    })
    .catch((err) => {
        next(err);
    })
}

exports.deleteCommentById = (req, res, next) => {
    const {comment_id} = req.params;
    deleteComment(comment_id)
    .then((isDeleted) => {
        res.status(204).end();
    })
    .catch((err) => {
        next(err);
    })
}