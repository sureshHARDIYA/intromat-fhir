const meta = require('./meta');
const narrative = require('./narrative');
const answerValueSet = require('./answerValueSet');

module.exports = {
  meta,
  language: String,
  implicitRules: String,
  text: narrative,
  contained: [Object.assign(answerValueSet, {
    id: String,
    resourceType: {
      type: String,
      enum: ['ValueSet'],
    },
  })]
};
