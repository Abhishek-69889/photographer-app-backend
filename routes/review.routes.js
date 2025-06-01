const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const reviewController = require("../controllers/review.controller");

router.get("/", authMiddleware(["admin"]), reviewController.getAllReviews);
router.delete("/:id", authMiddleware(["admin"]), reviewController.deleteReview);

module.exports = router;
