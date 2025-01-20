const express = require('express');
const multer = require('multer');
const { addProject, getProjects, updateProject, deleteProject } = require('../controller/project');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post('/projects', upload.single('image'), addProject);
router.get('/projects', getProjects);
router.put('/projects/:id', upload.single('image'), updateProject);
router.delete('/projects/:id', deleteProject);

module.exports = router;
