const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    tailorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tailor",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
      maxlength: 300,
    },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("Review", reviewSchema);
module.exports = ReviewModel;