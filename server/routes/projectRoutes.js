const express = require('express');
const { getProjects, createProject } = require('../controllers/projectController');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);
router.get('/', getProjects);
router.post('/', createProject);

module.exports = router;