const Token = require("../../../../models/token")
const db = require("../../../../database/connect")

describe('Class', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(Token).toBeDefined()
      })
})
