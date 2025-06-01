const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const categoryController = require("../controllers/category.controller");

router.post("/", authMiddleware(["admin"]), categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.put("/:id", authMiddleware(["admin"]), categoryController.updateCategory);
router.delete("/:id", authMiddleware(["admin"]), categoryController.deleteCategory);

module.exports = router;
