const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const tailorCtrl = require("../Controller/Controller_Tailor");
const findTailorCtrl = require("../Controller/Controller_FindTailor");

router.get("/", (req, res) => {
  res.json({ status: true, msg: "tailor route working" });
});

router.post("/save-profile", auth, tailorCtrl.saveOrUpdateTailorProfile);
router.post("/search", auth, tailorCtrl.searchTailor);          // ✅ was searchTailorByEmail
router.post("/aadhaar-ocr", auth, tailorCtrl.doExtractAadhaar); // ✅ was aadhaarOCR
router.get("/cities", auth, findTailorCtrl.getDistinctCities);
router.post("/find", auth, findTailorCtrl.findTailors);

module.exports = router;