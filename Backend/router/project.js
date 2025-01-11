const express = require('express');
const multer = require('multer');
const path = require('path');
const projectController = require('../controller/project'); // Adjust the path if needed

const router = express.Router();

// Multer setup for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Path to save the uploaded image
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// Routes
router.post('/projects', upload.single('image'), projectController.addProject);
router.get('/projects', projectController.getProjects);
router.put('/projects/:id', upload.single('image'), projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;
