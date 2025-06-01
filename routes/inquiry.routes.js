const express = require("express");
const router = express.Router();
const { submitInquiry } = require("../controllers/inquiry.controller");
const  authMiddleware  = require("../middlewares/auth.middleware");

router.post("/", authMiddleware(["client"]), submitInquiry);

module.exports = router;
