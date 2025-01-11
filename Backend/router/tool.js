const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { addTool, getTools, updateTool, deleteTool } = require('../controller/tool');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save uploaded files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to avoid filename conflicts
  }
});

const upload = multer({ storage });

// Route to get all tools
router.get('/tools', getTools);

// Route to add a new tool
router.post('/tools', upload.single('image'), addTool); // 'image' is the field name in the form

// Route to update an existing tool
router.put('/tools/:id', upload.single('image'), updateTool);

// Route to delete a tool
router.delete('/tools/:id', deleteTool);

module.exports = router;
