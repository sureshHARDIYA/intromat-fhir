const period = require('./types/period');
const quantity = require('./types/quantity');
const identifier = require('./types/identifier');
const status = require('./types/observationStatus');
const referenceRange = require('./types/referenceRange');
const domainResource = require('./types/domainResource');
const codeableConcept = require('./types/codeableConcept');
const observationComponent = require('./types/observationComponent');

module.exports = mongoose => {
	const Schema = new mongoose.Schema(
		Object.assign(domainResource, {
			resourceType: {
				type: String,
				required: true,
				enum: ['Observation'],
			},
			identifier: [identifier('Observation')],
			carePlan: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'CarePlan'
				}
			],
			deviceRequest: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'DeviceRequest'
				}
			],
			immunizationRecommendation: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'ImmunizationRecommendation'
				}
			],
			medicationRequest: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'MedicationRequest'
				}
			],
			nutritionOrder: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'NutritionOrder'
				}
			],
			serviceRequest: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'ServiceRequest'
				}
			],
			medicationAdministration: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'MedicationAdministration'
				}
			],
			medicationDispense: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'MedicationDispense'
				}
			],
			medicationStatement: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'MedicationStatement'
				}
			],
			procedure: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'Procedure'
				}
			],
			immunization: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'Immunization'
				}
			],
			imagingStudy: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'ImagingStudy'
				}
			],
			status,
			category: [codeableConcept],
			code: codeableConcept,
			patient: {
				type: mongoose.Schema.ObjectId,
				ref: 'Patient'
			},
			group: {
				type: mongoose.Schema.ObjectId,
				ref: 'Group'
			},
			device: {
				type: mongoose.Schema.ObjectId,
				ref: 'Device'
			},
			location: {
				type: mongoose.Schema.ObjectId,
				ref: 'Location'
			},
			focus: [String],
			encounter: {
				type: mongoose.Schema.ObjectId,
				ref: 'Encounter'
			},
			effectiveDateTime: Date,
			effectivePeriod: period,
			effectiveTiming: Date,
			effectiveInstant: Date,
			issued: Date,
			practitioner: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'Practitioner'
				}
			],
			practitionerRole: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'PractitionerRole'
				}
			],
			organization: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'Organization'
				}
			],
			careTeam: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'CareTeam'
				}
			],
			relatedPerson: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'RelatedPerson'
				}
			],
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
				lowerLimit: mongoose.Decimal128,
				upperLimit: mongoose.Decimal128,
				dimensions: Number,
				data: String
			},
			valueTime: Date,
			valueDateTime: Date,
			valuePeriod: period,
			dataAbsentReason: codeableConcept,
			interpretation: [codeableConcept],
			note: [
				{
					authorReferencePractitioner: {
						type: mongoose.Schema.ObjectId,
						ref: 'Practitioner'
					},
					authorReferencePatient: {
						type: mongoose.Schema.ObjectId,
						ref: 'Patient'
					},
					authorReferenceRelatedPerson: {
						type: mongoose.Schema.ObjectId,
						ref: 'RelatedPerson'
					},
					authorReferenceOrganization: {
						type: mongoose.Schema.ObjectId,
						ref: 'Organization'
					},
					time: Date,
					text: String
				}
			],
			bodySite: codeableConcept,
			method: codeableConcept,
			specimen: {
				type: mongoose.Schema.ObjectId,
				ref: 'Specimen'
			},
			deviceDevice: {
				type: mongoose.Schema.ObjectId,
				ref: 'Device'
			},
			deviceDeviceMetric: {
				type: mongoose.Schema.ObjectId,
				ref: 'DeviceMetric'
			},
			referenceRange: [referenceRange],
			observation: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'Observation'
				}
			],
			questionnaireResponse: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'QuestionnaireResponse'
				}
			],
			molecularSequence: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'MolecularSequence'
				}
			],
			documentReference: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'DocumentReference'
				}
			],
			media: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'Media'
				}
			],
			component: [observationComponent]
		}),
		{
			timestamps: true,
		},
	);

	const permitFields = [
		'identifier',
		'basedOn',
		'carePlan',
		'deviceRequest',
		'immunizationRecommendation',
		'medicationRequest',
		'nutritionOrder',
		'serviceRequest',
		'partOf',
		'medicationAdministration',
		'medicationDispense',
		'medicationStatement',
		'procedure',
		'immunization',
		'imagingStudy',
		'status',
		'category',
		'code',
		'subject',
		'patient',
		'group',
		'device',
		'location',
		'focus',
		'encounter',
		'effective',
		'issued',
		'performer',
		'practitioner',
		'practitionerRole',
		'organization',
		'careTeam',
		'relatedPerson',
		'value',
		'dataAbsentReason',
		'interpretation',
		'note',
		'bodySite',
		'method',
		'specimen',
		'deviceMetric',
		'referenceRange',
		'hasMember',
		'questionnaireResponse',
		'molecularSequence',
		'derivedFrom',
		'documentReference',
		'media',
		'component'
	];

	Schema.set('toJSON', {virtuals: true});

	Schema.virtual('basedOn').get(function () {
		return Object.assign(
			[],
			this.carePlan,
			this.deviceRequest,
			this.immunizationRecommendation,
			this.medicationRequest,
			this.nutritionOrder,
			this.serviceRequest
		);
	});

	Schema.virtual('partOf').get(function () {
		return Object.assign(
			[],
			this.medicationAdministration,
			this.medicationDispense,
			this.medicationStatement,
			this.procedure,
			this.immunization,
			this.imagingStudy
		);
	});

	Schema.virtual('subject').get(function () {
		return Object.assign(
			[],
			this.patient,
			this.group,
			this.device,
			this.location,
		);
	});

	Schema.virtual('performer').get(function () {
		return Object.assign(
			[],
			this.patient,
			this.practitioner,
			this.practitionerRole,
			this.careTeam,
			this.relatedPerson,
			this.organization,
		);
	});

	Schema.virtual('hasMember').get(function () {
		return Object.assign(
			[],
			this.observation,
			this.questionnaireResponse,
			this.molecularSequence,
		);
	});

	Schema.virtual('derivedFrom').get(function () {
		return Object.assign(
			[],
			this.documentReference,
			this.imagingStudy,
			this.media,
			this.observation,
			this.questionnaireResponse,
			this.molecularSequence,
		);
	});

	Schema.statics.getAll = async function(args) {
			try {
				const { limit = 100, page = 1 } = args || {};
				const query = { limit: Math.abs(parseInt(limit, 10) || 100) };
				const currentPage = Math.abs((parseInt(page, 10) || 1) - 1);
				const total = await this.count();
				query.skip = query.limit * currentPage;
				const observations = await this.find(
					{},
					{},
					{ sort: { createdAt: 'desc' }, limit: query.limit, skip: query.skip },
				);

				return ({
					total,
					pageSize: limit,
					page: currentPage + 1,
					totalPage: Math.ceil(total / limit),
					entry: observations.map(resource => ({ resource })),
				});
			} catch (e) {
				console.log('Observation error: ', e);
			}

	};

	Schema.statics.getOne = async function(params = {}) {
			try {
				const observation = await this.findOne(params || {});

				if (!observation) {
					throw new Error('Observation not found');
				}

				return observation;
			} catch (e) {
				console.log('Observation error: ', e);
			}
	};

	Schema.statics.createData = async function(params = {}) {
			try {
				const permitParams = permitFields.reduce(
					(obj, key) =>
						[undefined, null].includes(params[key])
							? obj
							: Object.assign(obj, { [key]: params[key] }),
					{},
				);
				permitParams.resourceType = 'Observation';
				return (await this.create(permitParams));
			} catch (e) {
				console.log('Observation error: ', e);
			}
	};

	Schema.statics.updateData = async function(_id, params = {}) {
			try {
				const observation = await this.findOne({ _id });

				if (!observation) {
					throw new Error('Observation not found');
				}

				Object.entries(params || {}).forEach(
					([key, value]) => (observation[key] = value),
				);
				observation.resourceType = 'Observation';
				await observation.save();

				return (observation);
			} catch (e) {
				console.log('Observation error: ', e);
			}
	};

	Schema.statics.removeData = async function(_id) {
			try {
				const observation = await this.findOne({ _id });

				if (!observation) {
					throw new Error('Observation not found');
				}

				await observation.remove();
				return (observation);
			} catch (e) {
				console.log('Observation error: ', e);
			}
	};

	return mongoose.model('Observation', Schema);

};
