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
const CanonicalScalar = require('../scalars/canonical.scalar.js');
const DateTimeScalar = require('../scalars/datetime.scalar.js');
const DateScalar = require('../scalars/date.scalar.js');

/**
 * @name exports
 * @summary Questionnaire Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'Questionnaire_Input',
	description:
		'A structured set of questions intended to guide the collection of answers from end-users. Questionnaires provide detailed control over order, presentation, phraseology and grouping to allow coherent, consistent data collection.',
	fields: () => ({
		resourceType: {
			type: new GraphQLNonNull(
				new GraphQLEnumType({
					name: 'Questionnaire_Enum_input',
					values: { Questionnaire: { value: 'Questionnaire' } },
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
			type: new GraphQLList(require('./valueset.input.js')),
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
		_url: {
			type: require('./element.input.js'),
			description:
				'An absolute URI that is used to identify this questionnaire when it is referenced in a specification, model, design or an instance; also called its canonical identifier. This SHOULD be globally unique and SHOULD be a literal address at which at which an authoritative instance of this questionnaire is (or will be) published. This URL can be the target of a canonical reference. It SHALL remain the same when the questionnaire is stored on different servers.',
		},
		url: {
			type: UriScalar,
			description:
				'An absolute URI that is used to identify this questionnaire when it is referenced in a specification, model, design or an instance; also called its canonical identifier. This SHOULD be globally unique and SHOULD be a literal address at which at which an authoritative instance of this questionnaire is (or will be) published. This URL can be the target of a canonical reference. It SHALL remain the same when the questionnaire is stored on different servers.',
		},
		identifier: {
			type: new GraphQLList(require('./identifier.input.js')),
			description:
				'A formal identifier that is used to identify this questionnaire when it is represented in other formats, or referenced in a specification, model, design or an instance.',
		},
		_version: {
			type: require('./element.input.js'),
			description:
				'The identifier that is used to identify this version of the questionnaire when it is referenced in a specification, model, design or instance. This is an arbitrary value managed by the questionnaire author and is not expected to be globally unique. For example, it might be a timestamp (e.g. yyyymmdd) if a managed version is not available. There is also no expectation that versions can be placed in a lexicographical sequence.',
		},
		version: {
			type: GraphQLString,
			description:
				'The identifier that is used to identify this version of the questionnaire when it is referenced in a specification, model, design or instance. This is an arbitrary value managed by the questionnaire author and is not expected to be globally unique. For example, it might be a timestamp (e.g. yyyymmdd) if a managed version is not available. There is also no expectation that versions can be placed in a lexicographical sequence.',
		},
		_name: {
			type: require('./element.input.js'),
			description:
				'A natural language name identifying the questionnaire. This name should be usable as an identifier for the module by machine processing applications such as code generation.',
		},
		name: {
			type: GraphQLString,
			description:
				'A natural language name identifying the questionnaire. This name should be usable as an identifier for the module by machine processing applications such as code generation.',
		},
		_title: {
			type: require('./element.input.js'),
			description:
				'A short, descriptive, user-friendly title for the questionnaire.',
		},
		title: {
			type: GraphQLString,
			description:
				'A short, descriptive, user-friendly title for the questionnaire.',
		},
		_derivedFrom: {
			type: require('./element.input.js'),
			description:
				'The URL of a Questionnaire that this Questionnaire is based on.',
		},
		derivedFrom: {
			type: new GraphQLList(CanonicalScalar),
			description:
				'The URL of a Questionnaire that this Questionnaire is based on.',
		},
		_status: {
			type: require('./element.input.js'),
			description:
				'The status of this questionnaire. Enables tracking the life-cycle of the content.',
		},
		status: {
			type: new GraphQLNonNull(CodeScalar),
			description:
				'The status of this questionnaire. Enables tracking the life-cycle of the content.',
		},
		_experimental: {
			type: require('./element.input.js'),
			description:
				'A Boolean value to indicate that this questionnaire is authored for testing purposes (or education/evaluation/marketing) and is not intended to be used for genuine usage.',
		},
		experimental: {
			type: GraphQLBoolean,
			description:
				'A Boolean value to indicate that this questionnaire is authored for testing purposes (or education/evaluation/marketing) and is not intended to be used for genuine usage.',
		},
		_subjectType: {
			type: require('./element.input.js'),
			description:
				'The types of subjects that can be the subject of responses created for the questionnaire.',
		},
		subjectType: {
			type: new GraphQLList(CodeScalar),
			description:
				'The types of subjects that can be the subject of responses created for the questionnaire.',
		},
		_date: {
			type: require('./element.input.js'),
			description:
				'The date  (and optionally time) when the questionnaire was published. The date must change when the business version changes and it must change if the status code changes. In addition, it should change when the substantive content of the questionnaire changes.',
		},
		date: {
			type: DateTimeScalar,
			description:
				'The date  (and optionally time) when the questionnaire was published. The date must change when the business version changes and it must change if the status code changes. In addition, it should change when the substantive content of the questionnaire changes.',
		},
		_publisher: {
			type: require('./element.input.js'),
			description:
				'The name of the organization or individual that published the questionnaire.',
		},
		publisher: {
			type: GraphQLString,
			description:
				'The name of the organization or individual that published the questionnaire.',
		},
		contact: {
			type: new GraphQLList(require('./contactdetail.input.js')),
			description:
				'Contact details to assist a user in finding and communicating with the publisher.',
		},
		_description: {
			type: require('./element.input.js'),
			description:
				"A free text natural language description of the questionnaire from a consumer's perspective.",
		},
		description: {
			type: GraphQLString,
			description:
				"A free text natural language description of the questionnaire from a consumer's perspective.",
		},
		useContext: {
			type: new GraphQLList(require('./usagecontext.input.js')),
			description:
				'The content was developed with a focus and intent of supporting the contexts that are listed. These contexts may be general categories (gender, age, ...) or may be references to specific programs (insurance plans, studies, ...) and may be used to assist with indexing and searching for appropriate questionnaire instances.',
		},
		jurisdiction: {
			type: new GraphQLList(require('./codeableconcept.input.js')),
			description:
				'A legal or geographic region in which the questionnaire is intended to be used.',
		},
		_purpose: {
			type: require('./element.input.js'),
			description:
				'Explanation of why this questionnaire is needed and why it has been designed as it has.',
		},
		purpose: {
			type: GraphQLString,
			description:
				'Explanation of why this questionnaire is needed and why it has been designed as it has.',
		},
		_copyright: {
			type: require('./element.input.js'),
			description:
				'A copyright statement relating to the questionnaire and/or its contents. Copyright statements are generally legal restrictions on the use and publishing of the questionnaire.',
		},
		copyright: {
			type: GraphQLString,
			description:
				'A copyright statement relating to the questionnaire and/or its contents. Copyright statements are generally legal restrictions on the use and publishing of the questionnaire.',
		},
		_approvalDate: {
			type: require('./element.input.js'),
			description:
				'The date on which the resource content was approved by the publisher. Approval happens once when the content is officially approved for usage.',
		},
		approvalDate: {
			type: DateScalar,
			description:
				'The date on which the resource content was approved by the publisher. Approval happens once when the content is officially approved for usage.',
		},
		_lastReviewDate: {
			type: require('./element.input.js'),
			description:
				'The date on which the resource content was last reviewed. Review happens periodically after approval but does not change the original approval date.',
		},
		lastReviewDate: {
			type: DateScalar,
			description:
				'The date on which the resource content was last reviewed. Review happens periodically after approval but does not change the original approval date.',
		},
		effectivePeriod: {
			type: require('./period.input.js'),
			description:
				'The period during which the questionnaire content was or is planned to be in active use.',
		},
		code: {
			type: new GraphQLList(require('./coding.input.js')),
			description:
				'An identifier for this question or group of questions in a particular terminology such as LOINC.',
		},
		item: {
			type: new GraphQLList(require('./questionnaireitem.input.js')),
			description:
				'A particular question, question grouping or display text that is part of the questionnaire.',
		},
	}),
});
