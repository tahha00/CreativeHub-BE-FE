const Book = require("../models/book");

const index = async (req, res) => {
    try {
      const bookings = await Book.getAll();
      res.status(200).json(bookings);
    } catch (err) {
      res.status(404).json({ "error": err.message });
    }
  };
  
  const show = async (req, res) => {
    try {
      const idx = parseInt(req.params.id);
      const booking = await Book.getOneById(idx);
      res.status(200).json(booking);
    } catch (err) {
      res.status(404).json({ "error": err.message });
    }
  };

  const create = async (req, res) => {
    try {
      const data = req.body;
      const result = await Book.create(data);
      res.status(201).send(result);
    } catch (err) {
      res.status(400).send({ "error": err.message });
    }
  };
  
  const destroy = async (req, res) => {
    try {
      const idx = parseInt(req.params.id);
      const booking = await Book.getOneById(idx);
      const removed = await booking.destroy();
  
      res.status(204).end();
    } catch (err) {
      res.status(404).send({ "error": err.message });
    }
  };
  
  module.exports = { index, show, create, destroy };
