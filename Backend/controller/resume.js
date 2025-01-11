const Resume = require('../model/resume');  // Change to resume model
const fs = require('fs');
const path = require('path');

// Add a new resume
exports.addResume = async (req, res) => {
  try {
    const { name } = req.body;
    const resume = req.file ? req.file.path : null;

    const newResume = new Resume({ name, resume });
    await newResume.save();
    res.status(200).json(newResume);
  } catch (error) {
    res.status(500).json({ message: "Error adding resume", error });
  }
};

// Get all resumes
exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resumes", error });
  }
};

// Update a resume
exports.updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const resume = req.file ? req.file.path : null;

    // Find the existing resume
    const existingResume = await Resume.findById(id);
    if (!existingResume) return res.status(404).json({ message: "Resume not found" });

    // Remove old resume if a new one is provided
    if (resume && existingResume.resume) {
      const oldResumePath = path.join(__dirname, '..', existingResume.resume);
      if (fs.existsSync(oldResumePath)) {
        fs.unlinkSync(oldResumePath); // Delete the old resume file
      }
    }

    // Prepare updated data
    const updatedData = { name };
    if (resume) updatedData.resume = resume;

    // Update the resume
    const updatedResume = await Resume.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: "Error updating resume", error });
  }
};

// Delete a resume
exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the resume to get the file path
    const resumeToDelete = await Resume.findById(id);
    if (!resumeToDelete) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Remove the associated resume file if it exists
    if (resumeToDelete.resume) {
      const filePath = path.resolve(resumeToDelete.resume); // Get the absolute file path
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting resume file: ${err.message}`);
        } else {
          console.log(`Deleted resume file: ${filePath}`);
        }
      });
    }

    // Delete the resume from the database
    await Resume.findByIdAndDelete(id);

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting resume", error });
  }
};
