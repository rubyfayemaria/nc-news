const connection = require('../db/connection')
const request = require('supertest');
const app = require('../app');
const seed = require('../db/seeds/seed');
const {
    articleData, 
    commentData, 
    topicData, 
    userData } = require('../db/data/test-data/index');

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