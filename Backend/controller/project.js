const Project = require("../model/project");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


exports.addProject = async (req, res) => {
  try {
  
    const { name, projectLink, type } = req.body;
    
    let image = null;


    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path,{ folder: 'projects',});
      image = result.secure_url; 
    }

    const newProject = new Project({ name, projectLink, type, image });
    await newProject.save();
    res.status(200).json(newProject);
  } catch (error) {

    console.log(error)
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
    const { name, projectLink, type } = req.body;
    let image = null;

    // Find the existing project
    const existingProject = await Project.findById(id);
    if (!existingProject) return res.status(404).json({ message: "Project not found" });

    // Remove old image from Cloudinary if a new one is provided
    if (req.file) {
      // Delete the old image from Cloudinary
      if (existingProject.image) {
        const publicId = existingProject.image.split('/').pop().split('.')[0]; // Extract public ID from the image URL
        await cloudinary.uploader.destroy(publicId); // Destroy old image from Cloudinary
      }

      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result.secure_url; // Get the secure URL of the new image
    }

    // Prepare updated data
    const updatedData = { name, projectLink, type };
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

    // Find the project to get the image URL
    const projectToDelete = await Project.findById(id);
    if (!projectToDelete) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the image from Cloudinary if it exists
    if (projectToDelete.image) {
      const publicId = projectToDelete.image.split('/').pop().split('.')[0]; // Extract public ID
      await cloudinary.uploader.destroy(publicId); // Destroy image from Cloudinary
    }

    // Delete the project from the database
    await Project.findByIdAndDelete(id);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};
