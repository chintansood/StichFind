var express = require("express");
var router = express.Router();
const auth = require("../Middleware/auth");
var customerController = require("../Controller/Controller_CustomerProfile");


// ================= CREATE =================
router.post("/create",  customerController.doSignupWithPic);

// ================= FIND =================
router.post("/find",  customerController.doFindWithPic);

// ================= UPDATE =================
router.post("/update",  customerController.doUpdateWithPic);

// ================= DELETE =================
router.post("/delete",  customerController.doDeleteWithPic);

module.exports = router;