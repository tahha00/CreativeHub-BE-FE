const User = require("../../../../models/user")
const db = require("../../../../database/connect")

describe('Class', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(User).toBeDefined()
      })

      describe('getOneById', () => {
        it('retrieves one specific user', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({
              rows: [{ name: "Intermediate Pottery", venue: "The Crafts Centre", date: "Every_Tuesday", "user_id": 1 },
              { name: "Introduction to Glass Blowing", venue: "Florin Town Hall", date: "Every_Friday", "user_id": 2}]
            })
            const data = { username: "Greg", password: "Hello"}
            await User.create(data)
          const classes = await User.getOneById(1)
          expect(classes).toHaveLength(1)
        })


    })
})

