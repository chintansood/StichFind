const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");

router.get("/", (req, res) => {
  res.json({ status: true, msg: "tailor route working" });
});

router.get("/test-auth", auth, (req, res) => {
  res.json({ status: true, msg: "auth working" });
});

module.exports = router;