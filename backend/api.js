const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
const userRouter = require('./routers/user');
const reviewRouter = require("./routers/reviews")

const api = express();

api.use(cors());
api.use(express.json())
api.use(logRoutes);

api.get("/", (req, res) => {
    res.json({
        name: "SQL injectors",
        description: "Group project 2"
    })
})

api.use("/users", userRouter)
api.use("/reviews", reviewRouter)

module.exports = api;


