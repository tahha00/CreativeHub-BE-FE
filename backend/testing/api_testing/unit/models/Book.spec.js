const Book = require("../../../../models/book")
const db = require("../../../../database/connect")

describe('Class', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(Book).toBeDefined()
      })
})
