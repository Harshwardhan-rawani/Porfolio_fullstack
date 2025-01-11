const mongoose = require('mongoose');

// Define the Resume Schema
const resumeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    resume: {
      type: String, // Store the file path or URL
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the model based on the schema
const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
