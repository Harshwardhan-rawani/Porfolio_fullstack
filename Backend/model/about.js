const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  profileImage: {
    type: String, // URL or file path to the profile image
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Email validation regex
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Example: 10-digit phone number
  },
  age: {
    type: Number,
    required: true,
    min: 1, // Minimum age
  },
  dob: {
    type: Date,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  graduationStart: {
    type: Date,
    required: true,
  },
  graduationEnd: {
    type: Date,
    required: true,
  },
  marksheetImage: {
    type: String, // URL or file path for the marksheet image
    required: true,
  },
  resumeImage: {
    type: String, // URL or file path for the resume image
    required: true,
  },
  driveLink: {
    type: String, // Google Drive or cloud storage link
    required: true,
    match: /^(http|https):\/\/drive\.google\.com\/.+$/, // Matches a Google Drive link
  },
  createdAt: {
    type: Date,
    default: Date.now, // Auto-sets the creation time
  },
});

module.exports = mongoose.model("About", AboutSchema);
