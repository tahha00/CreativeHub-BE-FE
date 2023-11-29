const express = require("express");
const classesRouter = express.Router()
const classesController = require ("../controllers/classes")



classesRouter.get("/", classesController.index);
classesRouter.get("/:name", classesController.getIdByName)
classesRouter.get("/:id", classesController.show)
classesRouter.get("/filter/:id/:date", classesController.filterItems)
// classesRouter.get("/filter/date/:date", classesController.dateFilter)


module.exports = classesRouter;
