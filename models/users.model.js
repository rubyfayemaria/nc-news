const db = require('../db/connection');

exports.selectUsers = () => {
    return db
    .query(`
    SELECT * FROM users;`)
    .then(({rows}) => {
        if(rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: 'Page not found.'
            })
        } else {
            return rows;
        }
    })
}