const { returnTopicsArray } = require("../models/topics.model")
const fs = require('fs');


exports.getTopics = (req, res, next) => {
    returnTopicsArray()
    .then((topics) => {
        res.status(200).send(topics)
    })
    .catch((err) => {
        next(err);
    })
}

exports.getAllEndPoints = (req, res, next) => {
    fs.readFile('endpoints.json', (err, endpoints) => {
        if(err) {
            console.log(err)
        }
    res.status(200).send(JSON.parse(endpoints)) 
    })
    
}