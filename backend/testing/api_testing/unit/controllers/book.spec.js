const { TestEnvironment } = require("jest-environment-jsdom")
const bookingController = require("../../../../controllers/book")
const Bookings = require("../../../../models/book")

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

let mocks = 0

describe("booking controller", ()=>{
    beforeEach( ()=> jest.clearAllMocks())

    afterAll(()=> jest.resetAllMocks())

    describe("index", () =>{
        it("returns all bookings with a status code 200", async () =>{
            const testbooking = {"user_id": 1, 
                "class_time": "Monday", 
                "class_start": "20:00:00"}
            jest.spyOn(Bookings, "getAll")
            .mockResolvedValue(testbooking)

            await bookingController.index(null,mockRes)

            expect(Bookings.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
        })

        it("sends an error upon failure", async() =>{
            const testbooking = []
            jest.spyOn(Bookings, "getAll")
            .mockRejectedValue(testbooking)

            expect(Bookings.getAll).toHaveBeenCalledTimes(0)
            expect(mockStatus).toHaveBeenCalledWith(404)

        })
    })

    describe("show", ()=>{
        it("returns a specific booking with a status code 200", async()=>{
            const testbooking = {"user_id": 1, 
                "class_time": "Monday", 
                "class_start": "20:00:00"}
            jest.spyOn(Bookings, "getOneById").
            mockResolvedValue(testbooking)

            const bookingID = { params: { id: 1 }}

            await bookingController(bookingID, mockRes)
            

            expect(Bookings.getOneById).toHaveBeenCalledTimes(1)
            expectmockStatus.toHaveBeenCalledWith(200)
        })

        it("returns an error upon failure", async () =>{
            const testbooking = []
            jest.spyOn(Bookings, "getOneById")
            .mockRejectedValue(new Error ("Cannot locate booking"))

            const bookingID = { params: { id: 1 }}

            await bookingController(bookingID, mockRes)
            

            expect(Bookings.getOneById).toHaveBeenCalledTimes(0)
            expectmockStatus.toHaveBeenCalledWith(404)
        })
    })

    describe("create", ()=>{
        it("should return a new booking with status 201", async () =>{
            const newBooking = {"booking_id":1, "class_id":2, "user_id":1, "class_time":"20:00:00"}
            jest.spyOn(Bookings, "create")
            .mockResolvedValue(newBooking)
            

            await bookingController(newBooking, mockRes)
            expect(Bookings.create).toHaveBeenCalledTimes(0)
            expect(mockStatus).toHaveBeenCalledWith(201)
        })
        it("should return an error upon failure", async () =>{
            const newBooking = {"booking_id":1, "class_id":2, "user_id":1, "class_time":"20:00:00"}
            jest.spyOn(Bookings, "create")
            .mockRejectedValue(newBooking)

            expect(Bookings.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400)
        

        })


    })

    describe("destroy", ()=>{
        it("should return nothing, with a status of 204", async ()=>{

            const removedBooking = []
            jest.spyOn(Bookings, "destroy")
            .mockResolvedValue(removedBooking)


            const bookingID = { params: { id: 1 }}

            await bookingController(bookingID, mockRes)
            

            expect(Bookings.getOneById).toHaveBeenCalledTimes(0)
            expectmockStatus.toHaveBeenCalledWith(204)


        })
        it("should return 404 upon failure", async ()=>{
            const removedBooking = []
            jest.spyOn(Bookings, "destroy")
            .mockRejectedValue(removedBooking)


            const bookingID = { params: { id: 1 }}

            await bookingController(bookingID, mockRes)

            expect(Bookings.getOneById).toHaveBeenCalledTimes(1)
            expectmockStatus.toHaveBeenCalledWith(404)



        })

    })
})
