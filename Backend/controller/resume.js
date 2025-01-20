const Resume = require('../model/resume'); // Change to resume model
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Add a new resume
exports.addResume = async (req, res) => {
  try {
    const { name } = req.body;

    let resumeUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'resumes',
        resource_type: 'raw', // This ensures any file type can be uploaded
      });
      resumeUrl = result.secure_url;
    }

    const newResume = new Resume({ name, resume: resumeUrl });
    await newResume.save();
    res.status(200).json(newResume);
  } catch (error) {
    res.status(500).json({ message: 'Error adding resume', error });
  }
};

// Get all resumes
exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resumes', error });
  }
};

// Update a resume
exports.updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Find the existing resume
    const existingResume = await Resume.findById(id);
    if (!existingResume) return res.status(404).json({ message: 'Resume not found' });

    let resumeUrl = existingResume.resume;
    if (req.file) {
      // Remove the old resume from Cloudinary if it exists
      if (existingResume.resume) {
        const publicId = existingResume.resume.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`resumes/${publicId}`, { resource_type: 'raw' });
      }

      // Upload the new resume to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'resumes',
        resource_type: 'raw',
      });
      resumeUrl = result.secure_url;
    }

    // Update the resume
    const updatedData = { name, resume: resumeUrl };
    const updatedResume = await Resume.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: 'Error updating resume', error });
  }
};

// Delete a resume
exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the resume to get the file path
    const resumeToDelete = await Resume.findById(id);
    if (!resumeToDelete) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Remove the resume from Cloudinary
    if (resumeToDelete.resume) {
      const publicId = resumeToDelete.resume.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`resumes/${publicId}`, { resource_type: 'raw' });
    }

    // Delete the resume from the database
    await Resume.findByIdAndDelete(id);

    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resume', error });
  }
};
