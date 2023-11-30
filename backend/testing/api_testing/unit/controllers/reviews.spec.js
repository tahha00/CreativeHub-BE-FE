const { TestEnvironment } = require("jest-environment-jsdom")
const reviewController = require("../../../../controllers/reviews")
const Review = require("../../../../models/reviews")

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

let mocks = 0

describe('review controller', () => {
    beforeEach(() => jest.clearAllMocks())
  
    afterAll(() => jest.resetAllMocks())
  
    describe('index', () => {
      it('returns all reviews with a status code 200', async () => {
        jest.spyOn(Review, 'getAll')
          .mockResolvedValue({rows: [{"name": "Kengi", "review": "Fantastic"}, { "name": "George" , "review": "Thiss is good"}]})
  
        await reviewController.index(null, mockRes)
  
  
        expect(Review.getAll).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(200)
      })

      it('it sends an error upon fail', async () => {
        const errorMessage = 'No reviews exists';
        jest.spyOn(Review, 'getAll')
          .mockImplementation(async (data) => {
            throw new Error(errorMessage);
          });
  
        await reviewController.index(null, mockRes)
  
  
        expect(Review.getAll).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(404)
      })
    })
  
    describe('show', () => {
        it('returns one specific review with a status code 200', async () => {
            jest.spyOn(Review, 'getOneById')
              .mockResolvedValue({rows: [{"name": "Kengi", "review": "Fantastic", "review_id": 1}, { "name": "George" , "review": "Thiss is good", "review_id": 2}]})
      
              const id = { params: { id: 1 }}
            
              await reviewController.show(id, mockRes)
      
      
            expect(Review.getOneById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200) 
          })
    
          it('it sends an error upon fail', async () => {
            const errorMessage = 'No reviews exists';
            jest.spyOn(Review, 'getOneById')
              .mockImplementation(async (data) => {
                throw new Error(errorMessage);
              });
      
            await reviewController.show(null, mockRes)
      
      
            expect(Review.getOneById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
          })
        })
})
