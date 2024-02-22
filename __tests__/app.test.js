const connection = require('../db/connection')
const request = require('supertest');
const app = require('../app');
const seed = require('../db/seeds/seed');
const {
    articleData, 
    commentData, 
    topicData, 
    userData } = require('../db/data/test-data/index');
const endpoints = require('../endpoints.json');

beforeEach(() => seed({topicData, userData, articleData, commentData }));
afterAll(() => {
    return connection.end();
})

describe('/api/topics', () => {
    test('GET: 200 responds with an array of topic objects', () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {
                const topics = response.body;
                expect(topics).toHaveLength(3);
                topics.forEach((topic) => {
                    return expect(topic).toMatchObject({
                        slug: expect.any(String),
                        description: expect.any(String)
                    });
                })
            })
    });
    test('GET: 404 sends appropriate status and error message when given a route that does not exist ', () => {
        return request(app)
            .get('/api/notaroute')
            .expect(404)
            .then((response) => {
                expect(response.statusCode).toBe(404)
            })
    });
});

describe('/api', () => {
    test('should respond with JSON object of all available endpoints  on API', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(endpoints);
        })
    });
});

describe('/api/articles', () => {
    test('GET: 200 responds with article object of correct id', () => {
        const id = 6;
        return request(app)
        .get(`/api/articles/${id}`)
        .expect(200)
        .then((response) => {
            const article = response.body.article;
            expect(article.article_id).toBe(id);
            expect(article).toMatchObject({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String)
            });
        })
    });
    test('GET: 400 responds with correct error when given an invalid id', () => {
        return request(app)
        .get('/api/articles/invalidid')
        .expect(400)
        .then((response) => {
            const error = response.body;
            expect(error).toEqual({err: 400, msg: 'Bad request'});
        })
    });
    test('GET: 404 responds with correct error when given an article id that does not exist', () => {
        const id = 9999
        return request(app)
        .get(`/api/articles/${id}`)
        .expect(404)
        .then((response) => {
            expect(response.body).toEqual({ status: 404, msg: 'Page not found.' });
        })
    });
    test('GET: 200 responds with an array of article objects', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {
            const articles = response.body;
            expect(articles).toHaveLength(13);
            articles.forEach((article) => {
                return expect(article).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comment_count: expect.any(Number),
                });
            })
        })
    });
    test('should be sorted by date in descending order', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {
            const articles = response.body;
            const dates = articles.map(article => article.created_at);
            const sortedDates = dates.slice().sort((a, b) => new Date(b) - new Date(a));
            expect(dates).toEqual(sortedDates);
        })
    });
    test('GET: 404 responds with correct error when given a route that does not exist', () => {
        return request(app)
        .get('/api/notaroute')
        .expect(404)
        .then((response) => {
            expect(response.statusCode).toBe(404);
        })
    });
});

describe('/api/articles/:article_id/comments', () => {
    test('GET: 200 responds with an array of comments for given article', () => {
        const id = 3;
        return request(app)
        .get(`/api/articles/${id}/comments`)
        .expect(200)
        .then((response) => {
            const comments = response.body
            comments.forEach((comment) => {
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    body: expect.any(String),
                    article_id: expect.any(Number),
                    author: expect.any(String),
                    votes: expect.any(Number),
                    created_at: expect.any(String)
                });
            })
        })
    });
    test('comments should be served with most recent comment first', () => {
        const id = 1;
        return request(app)
        .get(`/api/articles/${id}/comments`)
        .expect(200)
        .then((response) => {
            const comments = response.body;
            const times = comments.map(comment => comment.created_at);
            const sortedTimes = times.slice().sort((a, b) => new Date(b) - new Date(a));
            expect(times).toEqual(sortedTimes);
        })
    });
    test('GET: 400 responds with appropriate error object when given an invalid id', () => {
        const id = 'invalidid';
        return request(app)
        .get(`/api/articles/${id}/comments`)
        .expect(400)
        .then((response) => {
            const error = response.body;
            expect(error).toEqual({ err: 400, msg: 'Bad request' });
        })
    });
    test('GET: 404 responds with appropriate error when given an id that does not exist', () => {
        const id = 88;
        return request(app)
        .get(`/api/articles/${id}/comments`)
        .expect(404)
        .then((response) => {
            const error = response.body;
            expect(error).toEqual({ status: 404, msg: 'Page not found.'});
        })
    });
    test('POST: 201 ', () => {
        const id = 1
        const newComment = { 
            username: 'butter_bridge', 
            body: 'This is my comment'}
        return request(app)
        .post(`/api/articles/${id}/comments`)
        .send(newComment)
        .expect(201)
        .then((response) => {
            const {comment} = response.body;
            expect(comment.author).toEqual('butter_bridge');
            expect(comment.body).toEqual('This is my comment');
        })
    });
    test('POST: 400 responds with appropriate error when request body does not meet validation requirements', () => {
        const id = 2
        const newComment = {
            body: 'This is another comment'
        }
        return request(app)
        .post(`/api/articles/${id}/comments`)
        .send(newComment)
        .expect(400)
        .then((response) => {
            const error = response.body;
            expect(error).toEqual({ err: 400, msg: 'Bad request'});
        })
    });
    test.only('POST: 400 responds with appropriate error when username does not exist', () => {
        const id = 3
        const newComment = {
            username: 'ruby',
            body: 'Yet another comment'
        }
        return request(app)
        .post(`/api/articles/${id}/comments`)
        .send(newComment)
        .expect(400)
        .then((response) => {
            const error = response.body;
            expect(error).toEqual({ err: 400, msg: 'Bad request'});
        })
    });
});