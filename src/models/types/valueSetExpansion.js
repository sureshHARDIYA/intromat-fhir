const mongoose = require('mongoose');

module.exports = {
  identifier: String,
  timestamps: Date,
  total: Number,
  offset: Number,
  parameter: [
    {
      name: String,
      value: mongoose.Mixed,
    },
  ],
  contains: [
    {
      system: String,
      abstract: Boolean,
      inactive: Boolean,
      version: String,
      code: String,
      display: String,
    },
  ],
};
