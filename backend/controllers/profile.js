const Bookings = require("../models/profile");

const show = async (req, res) => {
    try {
      const idx = parseInt(req.params.id);
      const booking = await Bookings.getBookingsByUserId(idx);
      res.status(200).json(booking);
    } catch (err) {
      res.status(404).json({ "error": err.message });
    }
  }
  
  const getById = async (req,res)=>{
    try{
      const idx = parseInt(req.params.bookingId);
      const booking = await Bookings.getOneById(idx)
      res.status(200).json(booking);

    }
    catch(err){
      res.status(404).json({ "error": err.message})

    }
  }

  const destroy = async (req, res) => {
    try {
      
        const bookingId = parseInt(req.params.bookingId);
        console.log('bookingId:', bookingId);
        const booking = await Bookings.getOneById(bookingId);
        console.log('booking:', booking);

        if (!booking) {
            return res.status(404).json({ "error": "Booking not found" });
        }

        const removed = await booking.destroy();
        console.log('removed:', removed);

        res.status(204).end();
        
    } catch (err) {
      console.log("hit destroy")
        res.status(404).send({ "error": err.message });
    }
};

  module.exports={show, destroy, getById }
