const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const tailorCtrl = require("../Controller/Controller_Tailor");
const findTailorCtrl = require("../Controller/Controller_FindTailor"); // ✅ add this

router.get("/", (req, res) => {
  res.json({ status: true, msg: "tailor route working" });
});

router.post("/save-profile", auth, tailorCtrl.saveOrUpdateTailorProfile);
router.post("/search", auth, tailorCtrl.searchTailorByEmail);
router.post("/aadhaar-ocr", auth, tailorCtrl.aadhaarOCR);

// ✅ These now point to the correct controller
router.get("/cities", auth, findTailorCtrl.getDistinctCities);
router.post("/find", auth, findTailorCtrl.findTailors);

module.exports = router;