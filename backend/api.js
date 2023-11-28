const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
const userRouter = require('./routers/user');
const reviewRouter = require("./routers/reviews")
const bookingRouter = require("./routers/book")

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
api.use("/bookings", bookingRouter)

module.exports = api;


