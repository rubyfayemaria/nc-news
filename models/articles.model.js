const db = require('../db/connection')

exports.selectArticleById = (article_id) => {
    return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: 'Page not found.'})
        }
        else {
            return rows[0];
        }
    })
}

exports.selectArticles = (topic = null) => {
    let query = `
    SELECT articles.author, 
    articles.title, 
    articles.article_id, 
    articles.article_img_url, 
    articles.created_at, 
    articles.votes, 
    articles.topic, 
    COUNT (comments.comment_id)::INT AS comment_count 
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id`
    if (topic) {
        query += ` WHERE articles.topic = $1`
    }
    query += `
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`
    return db
    .query(query, topic ? [topic]: [])
    .then((result) => {
        const articles = result.rows;
        return articles;
    })
}

exports.updateVotes = (article_id, newVotes) => {
    return db
    .query(`
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *`, [newVotes, article_id])
    .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: 'Page not found.'
            })
        } else {
            return rows[0];
        }
    })
}