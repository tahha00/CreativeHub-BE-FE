const { Router } = require("express")

const reviewController = require("../controllers/reviews")

const authenticator = require("../middleware/authenticator")

const reviewRouter = Router()

reviewRouter.get("/", reviewController.index)
reviewRouter.get("/", reviewController.index)
reviewRouter.get("/:id", reviewController.show)
reviewRouter.post("/", authenticator, reviewController.create)
reviewRouter.delete("/:id", authenticator, reviewController.destroy)

module.exports = reviewRouter 
