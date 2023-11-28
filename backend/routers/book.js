const { Router } = require("express")

const bookingController = require("../controllers/book")

const authenticator = require("../middleware/authenticator")

const bookingRouter = Router();

bookingRouter.get("/", bookingController.index)
bookingRouter.get("/:id", bookingController.show)
bookingRouter.post("/", bookingController.create)
bookingRouter.delete("/:id", bookingController.destroy)


module.exports = bookingRouter ; 
