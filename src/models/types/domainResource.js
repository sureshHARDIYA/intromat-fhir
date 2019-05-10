const meta = require('./meta');
const narrative = require('./narrative');

module.exports = {
  meta,
  language: String,
  implicitRules: String,
  text: narrative,
  contained: [],
};
