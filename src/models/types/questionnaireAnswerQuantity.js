const mongoose = require('mongoose');

module.exports = {
  value: mongoose.Decimal128,
  comparator: {
    type: String,
    enum: ['<', '<=', '>=', '>'],
  },
  unit: String,
  system: String,
  code: String,
};
