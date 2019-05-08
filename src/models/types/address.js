const period = require('./period');

module.exports = {
  use: String,
  type: String,
  text: String,
  line: [String],
  city: String,
  district: String,
  state: String,
  country: String,
  postalCode: String,
  period,
};
