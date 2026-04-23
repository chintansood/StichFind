const express = require("express");
const router = express.Router();
const reviewCtrl = require("../Controller/Controller_Review");
const auth = require("../Middleware/auth");

// ===============================
// FIND TAILOR BY PHONE (for lookup)
// ===============================
router.post("/find-by-phone", auth, reviewCtrl.findTailorByPhone);

// ===============================
// ADD A REVIEW
// ===============================
router.post("/add", auth, reviewCtrl.addReview);

// ===============================
// GET ALL REVIEWS FOR A TAILOR
// ===============================
router.post("/get-by-phone", auth, reviewCtrl.getReviewsByPhone);

module.exports = router;