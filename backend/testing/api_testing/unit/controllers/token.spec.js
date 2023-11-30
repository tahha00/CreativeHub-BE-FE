const { TestEnvironment } = require("jest-environment-jsdom")
const tokenController = require("../../../../controllers/token")
const Token = require("../../../../models/token")

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

let mocks = 0   

describe('token controller', () => {
    beforeEach(() => jest.clearAllMocks())
  
    afterAll(() => jest.resetAllMocks())
  
    describe('show', () => {
        it('returns a specific user id with a status code 200', async () => {
            jest.spyOn(Token, 'getOneByToken')
              .mockResolvedValue(1)
      
              const token = { params: { token: "hajdkahdhs89829172" }}
            
              await tokenController.show(token, mockRes)
      
      
            expect(Token.getOneByToken).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200) 
          })
    
          it('it sends an error upon fail', async () => {
            jest.spyOn(Token, 'getOneByToken')
              .mockResolvedValue(1)
      
              const data = { params: {}}
            await tokenController.show(data, mockRes)
      
      
            expect(Token.getOneByToken).toHaveBeenCalledTimes(0)
            expect(mockStatus).toHaveBeenCalledWith(404)
          })
        })
})




    