const db = require('../db/connection');

exports.returnTopicsArray = () => {
    return db
    .query(`SELECT * FROM topics;`)
    .then((result) => {
        const topics = result.rows
        if(!topics) {
            return Promise.reject({
                status: 404,
                msg: 'Page not found.'
            })
        }
    return topics;
})
}
