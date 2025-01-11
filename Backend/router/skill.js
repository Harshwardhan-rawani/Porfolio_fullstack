const express = require("express");
const multer = require("multer");
const skillController = require("../controller/skill");

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Define routes
router.post("/skills", upload.single("image"), skillController.addSkill);
router.get("/skills", skillController.getSkills);
router.put("/skills/:id", upload.single("image"), skillController.updateSkill);
router.delete("/skills/:id", skillController.deleteSkill);

module.exports = router;
