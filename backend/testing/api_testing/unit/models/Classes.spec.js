const Class = require("../../../../models/Classes")
const db = require("../../../../database/connect")


describe('Class', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(Class).toBeDefined()
      })

      describe('getAll', () => {
        it('retrieves all the classes', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({
              rows: [{ name: "Intermediate Pottery", venue: "The Crafts Centre", date: "Every_Tuesday" },
              { name: "Introduction to Glass Blowing", venue: "Florin Town Hall", date: "Every_Friday" }]
            })
    
          const classes = await Class.showAll()
          expect(classes).toHaveLength(2)
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] })
    
          try {
            await Class.showAll()
          } catch (err) {
            expect(err).toBeDefined()
            expect(err.message).toBe("There is no data.")
          }
        })
      })


      describe('getOneById', () => {
        it('retrieves one specified class', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ "name": "Intermediate Pottery", "venue": "The Crafts Centre", "teacher": "Greg", "date": "Every_Tuesday", "class_id": "1" }, { "name": "Introduction to Glass Blowing", "venue": "Florin Town Hall", "date": "Every_Friday", "class_id": "2" }]})
    
          const result = await Class.getOneById(1)
          expect(result).toBeInstanceOf(Class)
          expect(result).toHaveProperty('name')
          expect(result).toHaveProperty('venue')
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue({rows : []})
    
          try {
            await Class.getOneById()
          } catch (error) {
            expect(error).toBeDefined()
          }
        })
      })

      describe('getOneByName', () => {
        it('retrieves one specified class by name', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ "name": "Intermediate Pottery", "venue": "The Crafts Centre", "teacher": "Greg", "date": "Every_Tuesday", "class_id": "1" }, { "name": "Introduction to Glass Blowing", "venue": "Florin Town Hall", "date": "Every_Friday", "class_id": "2" }]})
    
          const result = await Class.getOneByName("Interemediate Pottery")
          expect(result).toBeInstanceOf(Class)
          expect(result).toHaveProperty('name')
          expect(result).toHaveProperty('venue')
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue({rows : []})
    
          try {
            await Class.getOneByName("")
          } catch (error) {
            expect(error).toBeDefined()
          }
        })
      })

      describe('getItemsByFilters', () => {
        it('retrieves the specified classes', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ "name": "Intermediate Pottery", "venue": "The Crafts Centre", "teacher": "Greg", "date": "Every_Tuesday", "class_id": "1" }, { "name": "Introduction to Glass Blowing", "venue": "Florin Town Hall", "date": "Every_Friday", "class_id": "2" }]})
    
          const result = await Class.getItemsByFilters(1, "Every_Tuesday")
          expect(result).toBeInstanceOf(Class)
          expect(result).toHaveProperty('name')
          expect(result).toHaveProperty('venue')
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue({rows : []})
    
          try {
            await Class.getOneById()
          } catch (error) {
            expect(error).toBeDefined()
          }
        })
      })
})
