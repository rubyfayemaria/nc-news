const { returnTopicsArray } = require("../models/app.model")

exports.getTopics = (req, res, next) => {
    returnTopicsArray()
    .then((topics) => {
        res.status(200).send(topics)
    })
    .catch((err) => {
        next(err);
    })
}