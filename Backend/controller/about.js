const About = require("../model/about");
const fs = require("fs");
const path = require("path");

// Add a new "About" entry
exports.addAbout = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      age,
      dob,
      degree,
      college,
      graduationStart,
      graduationEnd,
      driveLink,
    } = req.body;

    const profileImage = req.files?.profileImage?.[0]?.path || null;
    const marksheetImage = req.files?.marksheetImage?.[0]?.path || null;
    const resumeImage = req.files?.resumeImage?.[0]?.path || null;
    const newAbout = new About({
      profileImage,
      name,
      email,
      phone,
      age,
      dob,
      degree,
      college,
      graduationStart,
      graduationEnd,
      marksheetImage,
      resumeImage,
      driveLink,
    });

    await newAbout.save();
   
    res.status(200).json(newAbout);
  } catch (error) {
    res.status(500).json({ message: "Error adding about details", error });
  }
};

// Get all "About" entries
exports.getAbouts = async (req, res) => {
  try {
    const abouts = await About.find();
    res.status(200).json(abouts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching about details", error });
  }
};

// Update an "About" entry
exports.updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      age,
      dob,
      degree,
      college,
      graduationStart,
      graduationEnd,
      driveLink,
    } = req.body;

    const existingAbout = await About.findById(id);
    if (!existingAbout) return res.status(404).json({ message: "About entry not found" });

    const profileImage = req.files?.profileImage?.[0]?.path || null;
    const marksheetImage = req.files?.marksheetImage?.[0]?.path || null;
    const resumeImage = req.files?.resumeImage?.[0]?.path || null;

    // Remove old images if new ones are provided
    if (profileImage && existingAbout.profileImage) {
      const oldPath = path.resolve(existingAbout.profileImage);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    if (marksheetImage && existingAbout.marksheetImage) {
      const oldPath = path.resolve(existingAbout.marksheetImage);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    if (resumeImage && existingAbout.resumeImage) {
      const oldPath = path.resolve(existingAbout.resumeImage);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    // Update data
    const updatedData = {
      name,
      email,
      phone,
      age,
      dob,
      degree,
      college,
      graduationStart,
      graduationEnd,
      driveLink,
    };

    if (profileImage) updatedData.profileImage = profileImage;
    if (marksheetImage) updatedData.marksheetImage = marksheetImage;
    if (resumeImage) updatedData.resumeImage = resumeImage;

    const updatedAbout = await About.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedAbout);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error updating about details", error });
  }
};

// Delete an "About" entry
exports.deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;

    const aboutToDelete = await About.findById(id);
    if (!aboutToDelete) return res.status(404).json({ message: "About entry not found" });

    // Remove associated images
    if (aboutToDelete.profileImage) {
      const filePath = path.resolve(aboutToDelete.profileImage);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    if (aboutToDelete.marksheetImage) {
      const filePath = path.resolve(aboutToDelete.marksheetImage);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    if (aboutToDelete.resumeImage) {
      const filePath = path.resolve(aboutToDelete.resumeImage);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await About.findByIdAndDelete(id);
    res.status(200).json({ message: "About entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting about entry", error });
  }
};
