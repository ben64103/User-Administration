const mongoose = require('mongoose');
const { MONGODB_URI } = require('../utils/config');
const { info, error } = require('../utils/logger');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    info('connected to MongoDB...');
  } catch (error) {
    error('error connecting to MONGODB...', error);
  }
};

module.exports = connectDB;
