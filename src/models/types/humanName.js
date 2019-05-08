const period = require('./period');

module.exports = {
  use: String,
  text: String,
  family: String,
  given: [String],
  prefix: [String],
  suffix: [String],
  period,
};
