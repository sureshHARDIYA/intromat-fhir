const codeableConcept = require('./codeableConcept');

module.exports = {
	low: String,
	high: String,
	type: codeableConcept,
	appliesTo: [codeableConcept],
	age: {
		low: String,
		high: String
	},
	text: String
};
