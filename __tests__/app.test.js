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
});