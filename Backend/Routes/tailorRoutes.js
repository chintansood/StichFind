const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const reviewCtrl = require("../Controller/Controller_Review");

router.get("/", (req, res) => {
  res.json({ status: true, msg: "tailor route working" });
});

router.post("/find-by-phone", auth, reviewCtrl.findTailorByPhone);

module.exports = router;