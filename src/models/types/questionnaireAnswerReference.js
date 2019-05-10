const identifier = require('./identifier');

module.exports = {
  reference: String,
  type: String,
  identifier: [identifier('Reference')],
  display: String,
};
