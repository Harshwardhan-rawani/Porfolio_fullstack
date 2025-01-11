const Skill = require("../model/skill");
const fs = require('fs');
const path = require('path');

// Add a new skill
exports.addSkill = async (req, res) => {
  try {
    const { skill, percentage } = req.body;
    const image = req.file ? req.file.path : null;

    const newSkill = new Skill({ skill, percentage, image });
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

exports.updateSkill = async (req, res) => {
    try {
      const { id } = req.params;
      const { skill, percentage } = req.body;
      const image = req.file ? req.file.path : null;
  
      // Find the existing skill
      const existingSkill = await Skill.findById(id);
      if (!existingSkill) return res.status(404).json({ message: "Skill not found" });
  
      // Remove old image if a new one is provided
      if (image && existingSkill.image) {
        const oldImagePath = path.join(__dirname, '..', existingSkill.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete the old image file
        }
      }
  
      // Prepare updated data
      const updatedData = { skill, percentage };
      if (image) updatedData.image = image;
  
      // Update the skill
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
  
      // Remove the associated image file if it exists
      if (skillToDelete.image) {
        const filePath = path.resolve(skillToDelete.image); // Get the absolute file path
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting image file: ${err.message}`);
          } else {
            console.log(`Deleted image file: ${filePath}`);
          }
        });
      }
  
      // Delete the skill from the database
      await Skill.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Skill deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting skill", error });
    }
  };