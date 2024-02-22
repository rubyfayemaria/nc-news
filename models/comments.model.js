const format = require('pg-format');
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

exports.insertComment = (article_id, username, body) => {
    const formatComments = format(`
    INSERT INTO comments 
    (article_id, author, body)
    VALUES 
    ($1, $2, $3)
    RETURNING *;`)
    return db.query(formatComments, [article_id, username, body])
    .then((result) => {
        const newComment = result.rows[0];
        return newComment;
    })
}

exports.deleteComment = (comment_id) => {
    return db
    .query(`
    DELETE FROM comments
    WHERE comment_id = $1;`, [comment_id])
    .then((result) => {
        if(result.rowCount === 0) {
            return Promise.reject({
                status: 404,
                msg: 'comment not found'
            })
        } else {
            return true;
        }
    })
}