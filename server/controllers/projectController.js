const Project = require('../models/Project');

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
  } catch (err) { next(err); }
};

exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create({ user: req.user._id, name: req.body.name });
    res.status(201).json(project);
  } catch (err) { next(err); }
};