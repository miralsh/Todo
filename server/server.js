require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes    = require('./routes/authRoutes');
const taskRoutes    = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected',mongoose.connection.db.databaseName))
  .catch(err => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));