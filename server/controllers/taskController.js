const Task = require('../models/Task');

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort('order');
    res.json(tasks);
  } catch (err) { next(err); }
};

exports.createTask = async (req, res, next) => {
  console.log('📥 createTask body:', req.body);
  try {
    const count = await Task.countDocuments({ user: req.user._id });
    const task = await Task.create({
      user: req.user._id,
      ...req.body,
      order: count
    });
    res.status(201).json(task);
  } catch (err) {
    console.error('❌ createTask error:', err);
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: 'Task deleted' });
  } catch (err) { next(err); }
};