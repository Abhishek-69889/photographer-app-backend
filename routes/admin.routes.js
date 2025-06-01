const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const adminController = require("../controllers/admin.controller");

router.get("/stats", authMiddleware(["admin"]), adminController.getStats);
router.get("/pending-partners", authMiddleware(["admin"]), adminController.getPendingPartners);
router.put("/verify-partner/:partnerId", authMiddleware(["admin"]), adminController.verifyPartner);
router.put("/promote-partner/:partnerId", authMiddleware(["admin"]), adminController.promotePartner);

module.exports = router;
