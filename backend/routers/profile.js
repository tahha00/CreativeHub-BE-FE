const { Router } = require("express")

const profileController = require("../controllers/profile")

const authenticator = require("../middleware/authenticator")

const profileRouter = Router();

profileRouter.get("/:id", profileController.show)
profileRouter.delete("/bookings/:bookingId", profileController.destroy)

module.exports = profileRouter; 