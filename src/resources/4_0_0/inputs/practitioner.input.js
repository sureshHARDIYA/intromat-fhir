const {
	GraphQLNonNull,
	GraphQLEnumType,
	GraphQLList,
	GraphQLString,
	GraphQLBoolean,
	GraphQLInputObjectType,
} = require('graphql');
const IdScalar = require('../scalars/id.scalar.js');
const UriScalar = require('../scalars/uri.scalar.js');
const CodeScalar = require('../scalars/code.scalar.js');
const DateScalar = require('../scalars/date.scalar.js');

/**
 * @name exports
 * @summary Practitioner Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'Practitioner_Input',
	description:
		'A person who is directly or indirectly involved in the provisioning of healthcare.',
	fields: () => ({
		resourceType: {
			type: new GraphQLNonNull(
				new GraphQLEnumType({
					name: 'Practitioner_Enum_input',
					values: { Practitioner: { value: 'Practitioner' } },
				}),
			),
			description: 'Type of resource',
		},
		_id: {
			type: require('./element.input.js'),
			description:
				'The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.',
		},
		id: {
			type: IdScalar,
			description:
				'The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.',
		},
		meta: {
			type: require('./meta.input.js'),
			description:
				'The metadata about the resource. This is content that is maintained by the infrastructure. Changes to the content might not always be associated with version changes to the resource.',
		},
		_implicitRules: {
			type: require('./element.input.js'),
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content. Often, this is a reference to an implementation guide that defines the special rules along with other profiles etc.',
		},
		implicitRules: {
			type: UriScalar,
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content. Often, this is a reference to an implementation guide that defines the special rules along with other profiles etc.',
		},
		_language: {
			type: require('./element.input.js'),
			description: 'The base language in which the resource is written.',
		},
		language: {
			type: CodeScalar,
			description: 'The base language in which the resource is written.',
		},
		text: {
			type: require('./narrative.input.js'),
			description:
				"A human-readable narrative that contains a summary of the resource and can be used to represent the content of the resource to a human. The narrative need not encode all the structured data, but is required to contain sufficient detail to make it 'clinically safe' for a human to just read the narrative. Resource definitions may define what content should be represented in the narrative to ensure clinical safety.",
		},
		contained: {
			type: new GraphQLList(GraphQLString),
			description:
				'These resources do not have an independent existence apart from the resource that contains them - they cannot be identified independently, and nor can they have their own independent transaction scope.',
		},
		extension: {
			type: new GraphQLList(require('./extension.input.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the resource. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.',
		},
		modifierExtension: {
			type: new GraphQLList(require('./extension.input.js')),
			description:
				"May be used to represent additional information that is not part of the basic definition of the resource and that modifies the understanding of the element that contains it and/or the understanding of the containing element's descendants. Usually modifier elements provide negation or qualification. To make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.  Modifier extensions SHALL NOT change the meaning of any elements on Resource or DomainResource (including cannot change the meaning of modifierExtension itself).",
		},
		identifier: {
			type: new GraphQLList(require('./identifier.input.js')),
			description: 'An identifier that applies to this person in this role.',
		},
		_active: {
			type: require('./element.input.js'),
			description: "Whether this practitioner's record is in active use.",
		},
		active: {
			type: GraphQLBoolean,
			description: "Whether this practitioner's record is in active use.",
		},
		name: {
			type: new GraphQLList(require('./humanname.input.js')),
			description: 'The name(s) associated with the practitioner.',
		},
		telecom: {
			type: new GraphQLList(require('./contactpoint.input.js')),
			description:
				'A contact detail for the practitioner, e.g. a telephone number or an email address.',
		},
		address: {
			type: new GraphQLList(require('./address.input.js')),
			description:
				'Address(es) of the practitioner that are not role specific (typically home address).  Work addresses are not typically entered in this property as they are usually role dependent.',
		},
		_gender: {
			type: require('./element.input.js'),
			description:
				'Administrative Gender - the gender that the person is considered to have for administration and record keeping purposes.',
		},
		gender: {
			type: CodeScalar,
			description:
				'Administrative Gender - the gender that the person is considered to have for administration and record keeping purposes.',
		},
		_birthDate: {
			type: require('./element.input.js'),
			description: 'The date of birth for the practitioner.',
		},
		birthDate: {
			type: DateScalar,
			description: 'The date of birth for the practitioner.',
		},
		photo: {
			type: new GraphQLList(require('./attachment.input.js')),
			description: 'Image of the person.',
		},
		qualification: {
			type: new GraphQLList(require('./practitionerqualification.input.js')),
			description:
				'The official certifications, training, and licenses that authorize or otherwise pertain to the provision of care by the practitioner.  For example, a medical license issued by a medical board authorizing the practitioner to practice medicine within a certian locality.',
		},
		communication: {
			type: new GraphQLList(require('./codeableconcept.input.js')),
			description:
				'A language the practitioner can use in patient communication.',
		},
	}),
});
