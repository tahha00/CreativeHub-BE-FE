const request = require('supertest')
const api = require("../../../api")

describe('api server', () => {
    
    afterAll((done) => {
      console.log('Gracefully stopping test server')
      api.close(done)
    })


    test('responds to POST /users/register with status 201', (done) => {
      request(api).post('/users/register').expect(201, done)
    })

    
})
