// /routes/authRoutesc
const express = require("express")
const {login} = require("../controller/login")

const router = express.Router();


// Login route
router.post('/login', login);
module.exports = router;
