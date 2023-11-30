const request = require('supertest')
const api = require("../../../api")

describe('api server', () => {

    afterAll((done) => {
      console.log('Gracefully stopping test server')
      api.close(done)
    })
  
  
    test('responds to POST /reviews with status 200', async () => {
      await request(api).post('/reviews').send({ })(200)
    })

  })
  