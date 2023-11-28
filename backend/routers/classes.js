const express = require("express");
const classesRouter = express.Router()
const classesController = require ("../controllers/classes")



classesRouter.get("/", classesController.index);
classesRouter.get("/:id", classesController.show)
classesRouter.get("/filter/:id", classesController.filterItems)



module.exports = classesRouter;
