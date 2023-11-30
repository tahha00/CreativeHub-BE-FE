const { TestEnvironment } = require("jest-environment-jsdom")
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
      it('returns all classes with a status code 200', async () => {
        const testClass = ['g1', 'g2']
  
        jest.spyOn(Class, 'showAll')
          .mockResolvedValue(testClass)
  
        await classesController.index(null, mockRes)
  
  
        expect(Class.showAll).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(200)
      })
  
      it('sends an error upon fail', async () => {
        const testClass = []
        jest.spyOn(Class, 'showAll')
          .mockResolvedValue(testClass)
  
  
        await classesController.index(null, mockRes)
  
        expect(Class.showAll).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(404)
      })
    })

    describe('show', () => {
        it('returns one class with a status code 200', async () => {
          const testClass = { "class_id": "1", "name": "Introduction to Pottery", "venue": "The Crafts Centre", "photo": null, "date": "Every_Monday"}
    
          jest.spyOn(Class, 'getOneById')
            .mockResolvedValue(testClass)
    
            const classId = 1

          await classesController.show({ params: { id: classId} }, mockRes)

          expect(Class.getOneById).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)
        })
    
        it('sends an error upon fail', async () => {
          jest.spyOn(Class, 'getOneById')
            .mockResolvedValue(null)
            
            const classId = 50
    
          await classesController.show({ params: { id: classId}}, mockRes)
    
          expect(Class.getOneById).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(404)
          expect(mockJson).toHaveBeenCalledWith({ error: 'Something happened to your db' })
        })
      })

      describe('filterItems', () => {
        it('returns classes with the specified data with a status code 200', async () => {
          const testClass = [{"venue_id": "1", "name": "Introduction to Pottery", "venue": "The Crafts Centre", "photo": null, "date": "Every_Monday"}, {"venue_id": "2", "name": "Introduction to Glass Mending", "venue": "Florin Historical Centre", "photo": null, "date": "Every_Monday"}, {"venue_id": "1", "name": "Introduction to Origami", "venue": "The Crafts Centre", "photo": null, "date": "Every_Monday"}]
    
          jest.spyOn(Class, 'getItemsByFilters')
            .mockResolvedValue(testClass)
    
            const venueId = 1
            const classDate = "Every_Monday"

          const response = await classesController.filterItems({ params: { id: venueId, date: classDate}}, mockRes)

          expect(Class.getItemsByFilters).toHaveBeenCalledTimes(1)
          expect(Class.getItemsByFilters).toHaveBeenCalledWith(1, "Every_Monday")
          expect(mockStatus).toHaveBeenCalledWith(200)
          expect(mockJson).toHaveBeenCalledWith(testClass)
        //   expect(response.length).toBe(2)
        })
    
        it('sends an error upon fail', async () => {
          const testClass = {}

          jest.spyOn(Class, 'getItemsByFilters')
            .mockResolvedValue(null)
    
        const venueId = 50
        const classDate = "Hello_World"

          const response = await classesController.filterItems({ params: { id: venueId, date: classDate}}, mockRes)
    
          expect(Class.getOneById).toHaveBeenCalledTimes(0)
          expect(mockStatus).toHaveBeenCalledWith(500)
          expect(mockJson).toHaveBeenCalledWith({ error: 'Internal Server Error' })
        })
      })
  })
