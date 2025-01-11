const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    projectLink: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Validate URL format
        },
        message: 'Invalid project link format!',
      },
    },
    type: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Store the image URL or file path
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
