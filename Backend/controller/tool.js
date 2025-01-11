const Tool = require('../model/tool');
const fs = require('fs');
const path = require('path');

// Add a new tool
exports.addTool = async (req, res) => {
  try {
    const { toolName } = req.body;

    const image = req.file ? req.file.path : null;

    const newTool = new Tool({ toolName, image });
    await newTool.save();
    res.status(200).json(newTool);
  } catch (error) {
    res.status(500).json({ message: "Error adding tool", error });
  }
};

// Get all tools
exports.getTools = async (req, res) => {
  try {
    const tools = await Tool.find();
    res.status(200).json(tools);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tools", error });
  }
};

// Update a tool
exports.updateTool = async (req, res) => {
  try {
    const { id } = req.params;
    const { toolName } = req.body;
    const image = req.file ? req.file.path : null;

    // Find the existing tool
    const existingTool = await Tool.findById(id);
    if (!existingTool) return res.status(404).json({ message: "Tool not found" });

    // Remove old image if a new one is provided
    if (image && existingTool.image) {
      const oldImagePath = path.join(__dirname, '..', existingTool.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Delete the old image file
      }
    }

    // Prepare updated data
    const updatedData = { toolName };
    if (image) updatedData.image = image;

    // Update the tool
    const updatedTool = await Tool.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json(updatedTool);
  } catch (error) {
    res.status(500).json({ message: "Error updating tool", error });
  }
};

// Delete a tool
exports.deleteTool = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the tool to get the image path
    const toolToDelete = await Tool.findById(id);
    if (!toolToDelete) {
      return res.status(404).json({ message: "Tool not found" });
    }

    // Remove the associated image file if it exists
    if (toolToDelete.image) {
      const filePath = path.resolve(toolToDelete.image); // Get the absolute file path
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting image file: ${err.message}`);
        } else {
          console.log(`Deleted image file: ${filePath}`);
        }
      });
    }

    // Delete the tool from the database
    await Tool.findByIdAndDelete(id);

    res.status(200).json({ message: "Tool deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tool", error });
  }
};
