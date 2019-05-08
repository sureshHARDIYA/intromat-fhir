const period = require('./period');
const gender = require('./gender');
const address = require('./address');
const humanName = require('./humanName');
const contactPoint = require('./contactPoint');

module.exports = {
  relationship: String,
  name: humanName,
  telecom: contactPoint,
  address,
  gender,
  period,
  organization: {
    type: 'ObjectId',
    ref: 'Organization',
  },
};
