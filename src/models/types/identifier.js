const reference = require('./reference');
const codeableConcept = require('./codeableConcept');

module.exports = ref => ({
  use: String,
  system: String,
  value: String,
  type: codeableConcept,
  assigner: reference(ref),
});
