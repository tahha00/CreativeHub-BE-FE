const Profile = require("../../../../models/profile")
const db = require("../../../../database/connect")

describe('Class', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(Profile).toBeDefined()
      })
})
