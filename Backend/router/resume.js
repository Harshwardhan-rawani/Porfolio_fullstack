const express = require('express');
const multer = require('multer');
const path = require('path');
const resumeController = require('../controller/resume');

// Set up multer storage for resume files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where resumes will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename with timestamp
  },
});

const upload = multer({ storage });

// Create the router
const router = express.Router();

// Route for adding a resume
router.post('/resumes', upload.single('resume'), resumeController.addResume);

// Route for fetching all resumes
router.get('/resumes', resumeController.getResumes);

// Route for updating a resume
router.put('/resumes/:id', upload.single('resume'), resumeController.updateResume);

// Route for deleting a resume
router.delete('/resumes/:id', resumeController.deleteResume);

module.exports = router;
