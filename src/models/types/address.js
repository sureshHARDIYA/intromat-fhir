const period = require('./period');

module.exports = {
  use: String,
  type: {
    type: String,
    enum: ['postal', 'physical', 'both'],
  },
  text: String,
  line: [String],
  city: String,
  district: String,
  state: String,
  country: String,
  postalCode: String,
  period,
};
