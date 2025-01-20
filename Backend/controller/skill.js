const Skill = require("../model/skill");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Add a new skill
exports.addSkill = async (req, res) => {
  try {
    const { skill, percentage } = req.body;
   console.log(req.file.path)
    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "skills",
      });
      imageUrl = result.secure_url;
    }

    const newSkill = new Skill({ skill, percentage, image: imageUrl });
    await newSkill.save();
    res.status(200).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: "Error adding skill", error });
  }
};

// Get all skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching skills", error });
  }
};

// Update a skill
exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { skill, percentage } = req.body;

    // Find the existing skill
    const existingSkill = await Skill.findById(id);
    if (!existingSkill) return res.status(404).json({ message: "Skill not found" });

    let imageUrl = existingSkill.image;
    if (req.file) {
      // Remove the old image from Cloudinary if it exists
      if (existingSkill.image) {
        const publicId = existingSkill.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`skills/${publicId}`);
      }

      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "skills",
      });
      imageUrl = result.secure_url;
    }

    // Update the skill
    const updatedData = { skill, percentage, image: imageUrl };
    const updatedSkill = await Skill.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: "Error updating skill", error });
  }
};

// Delete a skill
exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the skill to get the image path
    const skillToDelete = await Skill.findById(id);
    if (!skillToDelete) {
      return res.status(404).json({ message: "Skill not found" });
    }

    // Remove the image from Cloudinary
    if (skillToDelete.image) {
      const publicId = skillToDelete.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`skills/${publicId}`);
    }

    // Delete the skill from the database
    await Skill.findByIdAndDelete(id);

    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting skill", error });
  }
};
