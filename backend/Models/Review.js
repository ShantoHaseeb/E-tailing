const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    pid: { type: mongoose.Types.ObjectId, required: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 1 },
    review: { type: String, require: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
