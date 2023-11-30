const request = require('supertest')
const api = require("../../../api")

describe('api server', () => {
    
    afterAll((done) => {
      console.log('Gracefully stopping test server')
      api.close(done)
    })

    test('responds to POST /bookings with status 200', async () => {
        await request(api).post('/bookings').send({
            "class_id": 1,
            "user_id": 1,
            "class_date": "Every_Tuesday",
            "class_start": "23:59:59"
          }).expect(201)
      }, 10000)

    test('responds to GET /bookings with status 200', async () => {
        await request(api).get('/bookings').expect(200)
    })
})
