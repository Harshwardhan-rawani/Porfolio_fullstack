const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  toolName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('tool', toolSchema);
