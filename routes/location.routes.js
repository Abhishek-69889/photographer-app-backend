const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const locationController = require("../controllers/location.controller");

router.post("/", authMiddleware(["admin"]), locationController.createLocation);
router.get("/", locationController.getLocations);
router.put("/:id", authMiddleware(["admin"]), locationController.updateLocation);
router.delete("/:id", authMiddleware(["admin"]), locationController.deleteLocation);

module.exports = router;
