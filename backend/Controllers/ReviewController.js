const Review = require("../Models/Review");

module.exports = {
  writeReview: async (req, res) => {
    try {
      const pid = req.params.id;
      const { rating, review } = req.body;
      const p_review = await Review.create({ pid, rating, review });
      // await p_review.save()
      res.status(200).json({ msg: "Success", p_review });
    } catch (err) {}
  },
  getReview: async (req, res) => {
    try {
      const pid = req.params.id;
      const reviews = await Review.find({ pid });
      console.log(reviews);
      res.status(200).json({ msg: "Success", reviews });
    } catch (err) {}
  },
};
