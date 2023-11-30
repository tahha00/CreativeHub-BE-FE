const express = require('express');
const cors = require('cors'); 

const logRoutes = require('./middleware/logger');

const userRouter = require('./routers/user');
const classesRouter = require ('./routers/classes');
const reviewRouter = require("./routers/reviews")
const bookingRouter = require("./routers/book");
const profileRouter = require('./routers/profile');
const tokenRouter = require("./routers/token")


const api = express();

api.use(cors());
api.use(express.json())
api.use(logRoutes);



api.get("/", (req, res) => {
    res.status(200).send({
        name: "SQL injectors",
        description: "Group project 2"
    })
})

api.use("/users", userRouter)
api.use("/class", classesRouter)
api.use("/reviews", reviewRouter)
api.use("/bookings", bookingRouter)
api.use("/profile", profileRouter)
api.use("/tokens", tokenRouter)

module.exports = api;


