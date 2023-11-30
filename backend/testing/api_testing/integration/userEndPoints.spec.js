const request = require('supertest')
const api = require("../../../api")

describe('api server', () => {
    
    afterAll((done) => {
      console.log('Gracefully stopping test server')
      api.close(done)
    })


    test('responds to POST /users/register with status 201', async () => {
      await request(api).post('/users/register').send({ "username": "Kengi",
      "password": "Hi" }).expect(201)
    }, 10000)

    test('responds to POST /users/login with status 200', async () => {
      await request(api).post('/users/login').send({ "username": "Kengi",
      "password": "Hi" }).expect(200)
    }, 10000)
})
