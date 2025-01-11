const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  skill: { type: String, required: true ,unique: true },
  percentage: { type: Number, required: true },
  image: { type: String }, // Store image filename
}, { timestamps: true });

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
