const { TestEnvironment } = require("jest-environment-jsdom")
const userController = require("../../../../controllers/user")
const User = require("../../../../models/user")

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

let mocks = 0


describe('users controller', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('register', () => {
      it('successfully returns log in details with a status code 201', async () => {
        const testClass = { "username": "Kengi", "password": "Hello" }
  
        jest.spyOn(User, 'create')
          .mockResolvedValue(testClass)

        const data = { body: { "username": "Kengi", "password": "Hello" } }
  
        await userController.register(data, mockRes)
  
  
        expect(User.create).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(201)
      })
  
      it('sends an error upon fail', async () => {
        const errorMessage = 'User already exists';
        jest.spyOn(User, 'create')
          .mockImplementation(async (data) => {
            throw new Error(errorMessage);
          });
      
        const data = { body: { "username": "Kengi", "password": "Hello" } };
      
        await userController.register(data, mockRes);
      
        expect(User.create).toHaveBeenCalledTimes(1);
        expect(mockStatus).toHaveBeenCalledWith(404);
        expect(mockJson).toHaveBeenCalledWith({ error: errorMessage });
      });
    })

    describe('login', () => {
        it('successfully logs the user in with a status code 200', async () => {
          const testClass = { "username": "Thomas", "password": "Reddy" }
    
          jest.spyOn(User, 'getOneByUsername')
            .mockResolvedValue(testClass)
  
          const data = { body: { "username": "Thomas", "password": "Reddy" } }
            
          await userController.login(data, mockRes)
    
    
          expect(User.getOneByUsername).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)
        })



    })
})
