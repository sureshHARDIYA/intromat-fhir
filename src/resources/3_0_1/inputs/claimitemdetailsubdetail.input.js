const {
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLFloat,
	GraphQLInputObjectType,
} = require('graphql');
const PositiveIntScalar = require('../scalars/positiveint.scalar.js');

/**
 * @name exports
 * @summary ClaimitemdetailsubDetail Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'ClaimitemdetailsubDetail_Input',
	description: '',
	fields: () => ({
		_id: {
			type: require('./element.input.js'),
			description:
				'unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.',
		},
		id: {
			type: GraphQLString,
			description:
				'unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.',
		},
		extension: {
			type: new GraphQLList(require('./extension.input.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the element. In order to make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.',
		},
		modifierExtension: {
			type: new GraphQLList(require('./extension.input.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the element, and that modifies the understanding of the element that contains it. Usually modifier elements provide negation or qualification. In order to make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.',
		},
		_sequence: {
			type: require('./element.input.js'),
			description: 'A service line number.',
		},
		sequence: {
			type: new GraphQLNonNull(PositiveIntScalar),
			description: 'A service line number.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/ex-revenue-center
		revenue: {
			type: require('./codeableconcept.input.js'),
			description:
				'The type of reveneu or cost center providing the product and/or service.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/benefit-subcategory
		category: {
			type: require('./codeableconcept.input.js'),
			description:
				'Health Care Service Type Codes  to identify the classification of service or benefits.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/service-uscls
		service: {
			type: require('./codeableconcept.input.js'),
			description:
				'A code to indicate the Professional Service or Product supplied (eg. CTP, HCPCS,USCLS,ICD10, NCPDP,DIN,ACHI,CCI).',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/claim-modifiers
		modifier: {
			type: new GraphQLList(require('./codeableconcept.input.js')),
			description:
				'Item typification or modifiers codes, eg for Oral whether the treatment is cosmetic or associated with TMJ, or for medical whether the treatment was outside the clinic or out of office hours.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/ex-program-code
		programCode: {
			type: new GraphQLList(require('./codeableconcept.input.js')),
			description:
				'For programs which require reson codes for the inclusion, covering, of this billed item under the program or sub-program.',
		},
		quantity: {
			type: require('./quantity.input.js'),
			description: 'The number of repetitions of a service or product.',
		},
		unitPrice: {
			type: require('./money.input.js'),
			description: 'The fee for an addittional service or product or charge.',
		},
		_factor: {
			type: require('./element.input.js'),
			description:
				'A real number that represents a multiplier used in determining the overall value of services delivered and/or goods received. The concept of a Factor allows for a discount or surcharge multiplier to be applied to a monetary amount.',
		},
		factor: {
			type: GraphQLFloat,
			description:
				'A real number that represents a multiplier used in determining the overall value of services delivered and/or goods received. The concept of a Factor allows for a discount or surcharge multiplier to be applied to a monetary amount.',
		},
		net: {
			type: require('./money.input.js'),
			description:
				'The quantity times the unit price for an addittional service or product or charge. For example, the formula: unit Quantity * unit Price (Cost per Point) * factor Number  * points = net Amount. Quantity, factor and points are assumed to be 1 if not supplied.',
		},
		udi: {
			type: new GraphQLList(GraphQLString),
			description:
				'List of Unique Device Identifiers associated with this line item.',
		},
	}),
});
