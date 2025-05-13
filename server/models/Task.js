const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  project:     { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  title:       { type: String, required: true },
  description: String,
  dueDate:     Date,
  priority:    { type: String, enum: ['Low','Medium','High'], default: 'Medium' },
  category:    String,
  status:      { type: String, enum: ['Pending','In Progress','Completed'], default: 'Pending' },
  order:       Number
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);