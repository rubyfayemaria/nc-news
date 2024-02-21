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

// exports.addEndpoint = (endpoint, description) => {
//     fs.writeFile('endpoint.json', JSON.stringify(endpoint), err => {
//         console.log('Endpoint added')
//     })  
// }

exports.getAllEndPoints = (req, res) => {
    fs.readFile('endpoints.json', (err, endpoints) => {
        res.status(200).send(JSON.parse(endpoints)) 
    })
}
