require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//routes
const skillRoutes = require('./router/skill');
const toolRoutes = require("./router/tool")
const resumeRoutes = require("./router/resume")
const projectRoutes = require("./router/project")
const aboutRoutes = require("./router/about") 
const loginRoutes = require("./router/login") 
//models
const skillmodel = require("./model/skill")
const toolmodel = require("./model/tool")
const resumemodel = require("./model/resume")
const projectmodel = require("./model/project")
const aboutmodel = require("./model/about")
// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve uploaded images

// Routes
app.use('/api', skillRoutes);
app.use('/api', toolRoutes);
app.use('/api', resumeRoutes);
app.use('/api', projectRoutes);
app.use('/api', aboutRoutes);
app.use('/api', loginRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
