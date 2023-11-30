const { Router } = require("express")

const tokenController = require("../controllers/token")
const tokenRouter = Router()


tokenRouter.get("/:token", tokenController.show)

module.exports = tokenRouter
