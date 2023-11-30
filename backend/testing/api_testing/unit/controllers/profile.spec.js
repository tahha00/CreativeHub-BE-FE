const { TestEnvironment } = require("jest-environment-jsdom")
const profileController = require("../../../../controllers/profile")
const Bookings = require("../../../../models/profile")

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

let mocks = 0

describe('profile controller', () => {
    beforeEach(() => jest.clearAllMocks())
  
    afterAll(() => jest.resetAllMocks())
  
    describe('show', () => {
      it('returns one specific booking with a status code 200', async () => {
        jest.spyOn(Bookings, 'getBookingsByUserId')
          .mockResolvedValue({rows: [{"name": "Kengi", "review": "Fantastic", "user_id": 1}, { "name": "George" , "review": "Thiss is good", "user_id": 2}]})
  
        const idx = 1

        await profileController.show({ params: { id: idx }}, mockRes)
  
  
        expect(Bookings.getBookingsByUserId).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(200)
      })
    })
      describe('getById', () => {
        it('returns one specific booking with all booking data with a status code 200', async () => {
          jest.spyOn(Bookings, 'getOneById')
            .mockResolvedValue({rows: [{"name": "Kengi", "review": "Fantastic", "booking_id": 1}, { "name": "George" , "review": "Thiss is good", "booking_id": 2}]})
    
          const idx = 1
  
          await profileController.getById({ params: { id: idx }}, mockRes)
    
    
          expect(Bookings.getOneById).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)
        })
    })

    describe('destroy', () => {
        it('deletes a specific booking with all booking data with a status code 204', async () => {
          jest.spyOn(Bookings, 'destroy')
            .mockResolvedValue({rows: [{"name": "Kengi", "review": "Fantastic", "booking_id": 1}, { "name": "George" , "review": "Thiss is good", "booking_id": 2}]})
    
          const idx = 1
  
          await profileController.destroy({ params: { id: idx }}, mockRes)
    
    
          expect(Bookings.destroy).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(204)
        })
    })
})
