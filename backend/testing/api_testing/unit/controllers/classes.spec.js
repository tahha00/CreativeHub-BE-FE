const classesController = require("../../../../controllers/classes")
const Class = require("../../../../models/Classes")

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

let mocks = 0

describe('classes controller', () => {
    beforeEach(() => jest.clearAllMocks())
  
    afterAll(() => jest.resetAllMocks())
  
    describe('index', () => {
      it('should return all classes with a status code 200', async () => {
        const testClass = ['g1', 'g2']
  
        jest.spyOn(Class, 'showAll')
          .mockResolvedValue(testClass)
  
        await classesController.index(null, mockRes)
  
  
        expect(Class.showAll).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(200)
      })
  
      it('sends an error upon fail', async () => {
        // jest.spyOn(Class, 'showAll')
        //   .mockRejectedValue(new Error('Something happened to your db'))
  
  
        await classesController.index(null, mockRes)
  
        expect(Class.showAll).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(404)
        // expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })
      })
    })
  })
