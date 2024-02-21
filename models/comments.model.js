const db = require('../db/connection')

exports.selectCommentsById = (article_id) => {
    return db.query(`
    SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY comments.created_at DESC;
    `, [article_id])
    .then((result) => {
        const comments = result.rows;
        if (comments.length === 0) {
            return Promise.reject({
                status: 404,
                msg: 'Page not found.'
            })
        } else {   
            return comments;
        }
    })
}