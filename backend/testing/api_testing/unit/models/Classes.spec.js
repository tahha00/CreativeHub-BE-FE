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
            .mockResolvedValueOnce({ rows: [{ "name": "Intermediate Pottery", "venue": "The Crafts Centre", "date": "Every_Tuesday", "class_id": "1" }, { "name": "Introduction to Glass Blowing", "venue": "Florin Town Hall", "date": "Every_Friday", "class_id": "2" }]})
    
          const result = await Class.getOneById(1)
          expect(result).toBeInstanceOf(Class)
          expect(result.class_id).toEqual(1)
        })
    
        // it('should throw an Error on db query error', async () => {
        //   jest.spyOn(db, 'query').mockRejectedValue()
    
        //   try {
        //     await Goat.findById('red')
        //   } catch (error) {
        //     expect(error).toBeTruthy()
        //     expect(error.message).toBe('This goat does not exist!')
        //   }
        // })
      })
})
