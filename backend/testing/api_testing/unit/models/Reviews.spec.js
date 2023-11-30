const Review = require("../../../../models/reviews")
const db = require("../../../../database/connect")

describe('Class', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(Review).toBeDefined()
      })
})
