const request = require('supertest')
const api = require("../../../api")

describe('api server', () => {
    
    afterAll((done) => {
      console.log('Gracefully stopping test server')
      api.close(done)
    })
  
  
    test('responds to GET /class with status 200', (done) => {
      request(api).get('/').expect(200, done)
    })
  
    test('responds to GET / with a message and a description', async () => {
      const response = await request(api).get('/')
  
      expect(response.statusCode).toBe(200)
      expect(response.body.name).toBe('SQL injectors')
      expect(response.body.description).toBe('Group project 2')
    })
  
    test('responds to GET /class with status 200', (done) => {
      request(api).get('/class').expect(200, done)
    })

    test('responds to GET /class/:id with status 200', (done) => {
        request(api).get('/class/1').expect(200, done)
    })

    test('responds to GET /class/:id/:date with status 200', (done) => {
        request(api).get('/class/filter/1/Every_Tuesday').expect(200, done)
    })
  })
