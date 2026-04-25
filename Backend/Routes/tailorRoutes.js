const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const tailorCtrl = require("../Controller/Controller_Tailor");

router.get("/", (req, res) => {
  res.json({ status: true, msg: "tailor route working" });
});

router.post("/save-profile", auth, tailorCtrl.saveOrUpdateTailorProfile);
router.post("/search", auth, tailorCtrl.searchTailorByEmail);
router.post("/aadhaar-ocr", auth, tailorCtrl.aadhaarOCR);


module.exports = router;