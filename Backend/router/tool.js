const express = require('express');
const router = express.Router();
const { addTool, getTools, updateTool, deleteTool } = require('../controller/tool');


router.get('/tools', getTools);

router.post('/tools', addTool);

router.put('/tools/:id', updateTool);

router.delete('/tools/:id', deleteTool);

module.exports = router;
