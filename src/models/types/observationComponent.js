const period = require('./period');
const mongoose = require('mongoose');
const quantity = require('./quantity');
const referenceRange = require('./referenceRange');
const codeableConcept = require('./codeableConcept');



module.exports = {
	code: codeableConcept,
	valueQuantity: quantity,
	valueCodeableConcept: codeableConcept,
	valueString: String,
	valueBoolean: Boolean,
	valueInteger: Number,
	valueRange: {
		low: String,
		high: String
	},
	valueRatio: {
		denominator: quantity,
		numerator: quantity
	},
	valueSampledData: {
		origin: String,
		period: mongoose.Decimal128,
		factor: mongoose.Decimal128,
		lowerLimmit: mongoose.Decimal128,
		upperLimit: mongoose.Decimal128,
		dimensions: Number,
		data: String
	},
	valueTime: Date,
	valueDateTime: Date,
	valuePeriod: period,
	dataAbsentReason: codeableConcept,
	interpretation: [codeableConcept],
	referenceRange: [referenceRange]
};
