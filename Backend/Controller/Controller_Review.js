const ReviewModel = require("../Models/Review_Model");
const TailorModel = require("../Models/TailorProfile");

// ==========================
// FIND TAILOR BY PHONE
// ==========================
function findTailorByPhone(req, resp) {
  const { phone } = req.body;

  if (!phone || phone.length !== 10) {
    return resp
      .status(400)
      .json({ status: false, msg: "Valid 10-digit phone required" });
  }

  TailorModel.findOne({ phone })
    .then((tailor) => {
      if (!tailor) {
        return resp
          .status(404)
          .json({ status: false, msg: "No tailor found with this number" });
      }

      resp.status(200).json({
        status: true,
        name: tailor.fullName,
        tailorId: tailor._id,
      });
    })
    .catch((err) => {
      resp.status(500).json({ status: false, msg: err.message });
    });
}

// ==========================
// ADD REVIEW
// ==========================
function addReview(req, resp) {
  const { phone, rating, review } = req.body;

  if (!phone || !rating || !review) {
    return resp
      .status(400)
      .json({ status: false, msg: "Phone, rating and review are required" });
  }

  if (rating < 1 || rating > 5) {
    return resp
      .status(400)
      .json({ status: false, msg: "Rating must be between 1 and 5" });
  }

  TailorModel.findOne({ phone })
    .then((tailor) => {
      if (!tailor) {
        return resp
          .status(404)
          .json({ status: false, msg: "Tailor not found" });
      }

      return ReviewModel.create({
        tailorId: tailor._id,
        phone,
        rating,
        review,
      });
    })
    .then((newReview) => {
      if (!newReview) return;

      resp.status(200).json({
        status: true,
        msg: "Review published successfully",
        data: newReview,
      });
    })
    .catch((err) => {
      resp.status(500).json({ status: false, msg: err.message });
    });
}

// ==========================
// GET ALL REVIEWS FOR A TAILOR
// ==========================
function getReviewsByPhone(req, resp) {
  const { phone } = req.body;

  TailorModel.findOne({ phone })
    .then((tailor) => {
      if (!tailor) {
        return resp
          .status(404)
          .json({ status: false, msg: "Tailor not found" });
      }

      return ReviewModel.find({ tailorId: tailor._id })
        .sort({ createdAt: -1 })
        .then((reviews) => ({ tailor, reviews }));
    })
    .then((result) => {
      if (!result) return;

      const { tailor, reviews } = result;

      const avgRating =
        reviews.length > 0
          ? (
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(1)
          : 0;

      resp.status(200).json({
        status: true,
        tailorName: tailor.fullName,
        avgRating,
        totalReviews: reviews.length,
        data: reviews,
      });
    })
    .catch((err) => {
      resp.status(500).json({ status: false, msg: err.message });
    });
}

module.exports = {
  findTailorByPhone,
  addReview,
  getReviewsByPhone,
};