const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const partnerController = require("../controllers/partner.controller");

router.post("/profile", authMiddleware(["partner"]), partnerController.createProfile);
router.get("/leads", authMiddleware(["partner"]), partnerController.getLeads);

module.exports = router;
