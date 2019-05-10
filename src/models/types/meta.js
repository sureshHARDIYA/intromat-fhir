const coding = require('./coding');

module.exports = {
  versionId: String,
  lastUpdated: String,
  source: String,
  profile: [String],
  tag: [coding],
  security: [coding],
};
