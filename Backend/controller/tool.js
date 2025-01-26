const Tool = require('../model/tool');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Add a new tool
exports.addTool = async (req, res) => {

  try {
    const { toolName, imageBase64 } = req.body;

    let image = null;
    if (imageBase64) {
      const result = await cloudinary.uploader.upload(imageBase64, {
        folder: 'tools',
      });
      image = result.secure_url;
    }

    const newTool = new Tool({ toolName, image });
    await newTool.save();
    res.status(200).json(newTool);
  } catch (error) {
    res.status(500).json({ message: 'Error adding tool', error });
  }
};

// Get all tools
exports.getTools = async (req, res) => {
  try {
    const tools = await Tool.find();
    res.status(200).json(tools);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tools', error });
  }
};

// Update a tool
exports.updateTool = async (req, res) => {
  try {
    const { id } = req.params;
    const { toolName, imageBase64 } = req.body;

    const existingTool = await Tool.findById(id);
    if (!existingTool) return res.status(404).json({ message: 'Tool not found' });

    let image = existingTool.image;
    if (imageBase64) {
      // Delete old image from Cloudinary
      if (existingTool.image) {
        const publicId = existingTool.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`tools/${publicId}`);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(imageBase64, {
        folder: 'tools',
      });
      image = result.secure_url;
    }

    const updatedData = { toolName, image };
    const updatedTool = await Tool.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json(updatedTool);
  } catch (error) {
    res.status(500).json({ message: 'Error updating tool', error });
  }
};

// Delete a tool
exports.deleteTool = async (req, res) => {
  try {
    const { id } = req.params;

    const toolToDelete = await Tool.findById(id);
    if (!toolToDelete) return res.status(404).json({ message: 'Tool not found' });

    if (toolToDelete.image) {
      const publicId = toolToDelete.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`tools/${publicId}`);
    }

    await Tool.findByIdAndDelete(id);
    res.status(200).json({ message: 'Tool deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tool', error });
  }
};
