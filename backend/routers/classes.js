const express = require("express");
const classesRouter = express.Router()
const classesController = require ("../controllers/classes")



classesRouter.get("/", classesController.index);



module.exports = classesRouter;