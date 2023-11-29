const Review = require("../models/reviews");

const index = async (req, res) => {
  try {
    const reviews = await Review.getAll();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(404).json({ "error": err.message });
  }
};

const show = async (req, res) => {
  try {
    const idx = parseInt(req.params.id);
    const review = await Review.getOneById(idx);
    res.status(200).json(review);
  } catch (err) {
    res.status(404).json({ "error": err.message });
  }
};

const create = async (req, res) => {
  try {
    const data = req.body;
    const result = await Review.create(data);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send({ "error": err.message });
  }
};

const destroy = async (req, res) => {
  try {
    const idx = parseInt(req.params.id);
    const review = await Review.getOneById(idx);
    const removed = await review.destroy();

    res.status(204).end();
  } catch (err) {
    res.status(404).send({ "error": err.message });
  }
};

module.exports = { index, show, create, destroy };
