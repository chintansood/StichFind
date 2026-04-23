const express = require("express");
const router = express.Router();
const tailorCtrl = require("../Controller/Controller_Tailor");
const findTailorCtrl = require("../Controller/Controller_FindTailor");
const reviewCtrl = require("../Controller/Controller_Review");
const auth = require("../Middleware/auth");

router.post("/save-profile",  auth, tailorCtrl.saveOrUpdateTailorProfile);
router.post("/search",        auth, tailorCtrl.searchTailor);
router.post("/aadhaar-ocr",   auth, tailorCtrl.doExtractAadhaar);

router.get("/cities",         auth, findTailorCtrl.getDistinctCities);
router.post("/find",          auth, findTailorCtrl.findTailors);

router.post("/find-by-phone", auth, reviewCtrl.findTailorByPhone);

module.exports = router;
