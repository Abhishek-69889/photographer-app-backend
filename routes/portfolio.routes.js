const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const portfolioController = require("../controllers/portfolioController");

router.post("/", authMiddleware(["partner"]), portfolioController.addPortfolioItem);
router.get("/", authMiddleware(["partner"]), portfolioController.getPortfolioItems);
router.put("/:id", authMiddleware(["partner"]), portfolioController.updatePortfolioItem);
router.delete("/:id", authMiddleware(["partner"]), portfolioController.deletePortfolioItem);
router.put("/reorder", authMiddleware(["partner"]), portfolioController.reorderPortfolio);

module.exports = router;
