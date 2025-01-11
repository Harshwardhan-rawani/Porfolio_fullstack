const Project = require("../model/project");
const fs = require('fs');
const path = require('path');

// Add a new project
exports.addProject = async (req, res) => {
  try {
    const { name, projectLink } = req.body;
    const image = req.file ? req.file.path : null;

    const newProject = new Project({ name, projectLink, image });
    await newProject.save();
    res.status(200).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Error adding project", error });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, projectLink } = req.body;
    const image = req.file ? req.file.path : null;

    // Find the existing project
    const existingProject = await Project.findById(id);
    if (!existingProject) return res.status(404).json({ message: "Project not found" });

    // Remove old image if a new one is provided
    if (image && existingProject.image) {
      const oldImagePath = path.join(__dirname, '..', existingProject.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Delete the old image file
      }
    }

    // Prepare updated data
    const updatedData = { name, projectLink };
    if (image) updatedData.image = image;

    // Update the project
    const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the project to get the image path
    const projectToDelete = await Project.findById(id);
    if (!projectToDelete) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the associated image file if it exists
    if (projectToDelete.image) {
      const filePath = path.resolve(projectToDelete.image); // Get the absolute file path
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting image file: ${err.message}`);
        } else {
          console.log(`Deleted image file: ${filePath}`);
        }
      });
    }

    // Delete the project from the database
    await Project.findByIdAndDelete(id);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};
