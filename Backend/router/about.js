const express = require("express");
const multer = require("multer");
const { addAbout, getAbouts, updateAbout, deleteAbout } = require("../controller/about");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Routes
router.post("/about", upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "marksheetImage", maxCount: 1 },
  { name: "resumeImage", maxCount: 1 },
]), addAbout);

router.get("/about", getAbouts);
router.put("/about/:id", upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "marksheetImage", maxCount: 1 },
  { name: "resumeImage", maxCount: 1 },
]), updateAbout);

router.delete("/about/:id", deleteAbout);

module.exports = router;
