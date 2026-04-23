const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const findTailorCtrl = require("../Controller/Controller_FindTailor");

router.get("/", (req, res) => {
  res.json({ status: true, msg: "tailor route working" });
});

router.get("/cities", auth, findTailorCtrl.getDistinctCities);

module.exports = router;