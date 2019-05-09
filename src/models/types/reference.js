const codeableConcept = require('./codeableConcept');

module.exports = ref => ({
  reference: String,
  display: String,
  type: {
    ref,
    type: 'ObjectId',
  },
  identifier: {
    use: String,
    type: codeableConcept,
    system: String,
    value: String,
  },
});
