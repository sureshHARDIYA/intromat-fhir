const status = require('./types/encounterStatus');
const statusHistory = require('./types/statusHistory');
const classHistory = require('./types/classHistory');
const codeableConcept = require('./types/codeableConcept');
const period = require('./types/period');
const encounterLocationStatus = require('./types/encounterLocationStatus')
const domainResource = require('./types/domainResource');
const identifier = require('./types/identifier');


module.exports = mongoose => {
	const Schema = new mongoose.Schema(
		Object.assign(domainResource, {
			resourceType: {
				type: String,
				required: true,
				enum: ['Encounter'],
			},
			identifier: [identifier('Encounter')],
			status,
			statusHistory: [statusHistory],
			class: codeableConcept,
			classHistory: [classHistory],
			type: codeableConcept,
			serviceType: codeableConcept,
			priority: codeableConcept,
			subjectPatient: {
				type: mongoose.Schema.ObjectId,
				ref: 'Patient',
			},
			subjectGroup: {
				type: mongoose.Schema.ObjectId,
				ref: 'Group',
			},
			episodeOfCare: {
				type: 'ObjectId',
				ref: 'EpisodeOfCare',
			},
			basedOn: {
				type: 'ObjectId',
				ref: 'ServiceRequest',
			},
			Participant: [
				{
					type: codeableConcept,
					period: period,
					individualPractitioner: {
						type: mongoose.Schema.ObjectId,
						ref: 'Practitioner',
					},
					individualPractitionerRole: {
						type: mongoose.Schema.ObjectId,
						ref: 'PractitionerRole',
					},
					individualRelatedPerson: {
						type: mongoose.Schema.ObjectId,
						ref: 'RelatedPerson',
					},
				},
			],
			appointment: {
				type: 'ObjectID',
				ref: 'Appointment',
			},
			period: period,
			length: String,
			reasonCode: [codeableConcept],
			reasonReferenceCondition: {
				type: mongoose.Schema.ObjectId,
				ref: 'Condition',
			},

			reasonReferenceProcedure: {
				type: mongoose.Schema.ObjectId,
				ref: 'Procedure',
			},

			reasonReferenceObservation: {
				type: mongoose.Schema.ObjectId,
				ref: 'Observation',
			},

			reasonReferenceImmunizationRecommendation: {
				type: mongoose.Schema.ObjectId,
				ref: 'ImmunizationRecommendation',
			},
			diagnosis: [
				{
					conditionCondition: {
						type: mongoose.Schema.ObjectId,
						ref: 'Condition',
					},
					conditionProcedure: {
						type: mongoose.Schema.ObjectId,
						ref: 'Procedure',
					},
					use: codeableConcept,
					rank: String,
				},
			],
			account: [
				{
					type: 'ObjectId',
					ref: 'Account',
				},
			],
			hospitalization: {
				preAdmissionIdentifier: identifier('Organization'),
				originLocation: {
					type: mongoose.Schema.ObjectId,
					ref: 'Location',
				},
				originOrganization: {
					type: mongoose.Schema.ObjectId,
					ref: 'Organization',
				},
				admitSource: codeableConcept,
				reAdmission: codeableConcept,
				dietPreference: codeableConcept,
				specialCourtesy: codeableConcept,
				specialArrangement: codeableConcept,
				destinationLocation: {
					type: mongoose.Schema.ObjectId,
					ref: 'Location',
				},
				destinationOrganization: {
					type: mongoose.Schema.ObjectId,
					ref: 'Organization',
				},
				dischargeDisposition: codeableConcept,
			},
			location: [
				{
					location: {
						type: 'ObjectId',
						ref: 'Location',
					},
					status: encounterLocationStatus,
					physicalType: codeableConcept,
					period: period,
				},
			],
			serviceProvider: {
				type: 'ObjectId',
				ref: 'Organization',
			},
			partOf: {
				type: 'ObjectId',
				ref: 'Encounter',
			},
		}),
		{
			timestamps: true,
		},
	);

	const permitFields = [
		'identifier',
		'status',
		'statusHistory',
		'class',
		'classHistory',
		'type',
		'serviceType',
		'priority',
		'subject',
		'episodeOfCare',
		'basedOn',
		'participant',
		'appointment',
		'period',
		'length',
		'reasonReference',
		'diagnosis',
		'account',
		'hospitalization',
	];


	Schema.statics.getAll = function (args) {
		return new Promise(async (resolve, reject) => {
			try {
				const {limit = 100, page = 1} = args || {};
				const query = {limit: Math.abs(parseInt(limit, 10) || 100)};
				const currentPage = Math.abs((parseInt(page, 10) || 1) - 1);
				const total = await this.countDocuments();
				query.skip = query.limit * currentPage;
				const encounters = await this.find(
					{},
					{},
					{sort: {createdAt: 'desc'}, limit: query.limit, skip: query.skip},
				);
				resolve({
					total,
					pageSize: limit,
					page: currentPage + 1,
					totalPage: Math.ceil(total / limit),
					entry: encounters.map(resource => ({resource})),
				});
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.getOne = function (params = {}) {
		return new Promise(async (resolve, reject) => {
			try {
				const encounter = await this.findOne(params || {});

				if (!encounter) {
					throw new Error('Encounter not found');
				}

				resolve(encounter);
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.createData = function (params = {}) {
		return new Promise(async (resolve, reject) => {
			try {
				const permitParams = permitFields.reduce(
					(obj, key) =>
						[undefined, null].includes(params[key])
							? obj
							: Object.assign(obj, {[key]: params[key]}),
					{},
				);
				permitParams.resourceType = 'Encounter';
				resolve(await this.create(permitParams));
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.updateData = function (_id, params = {}) {
		return new Promise(async (resolve, reject) => {
			try {
				const encounter = await this.findOne({_id});

				if (!encounter) {
					throw new Error('Encounter not found');
				}

				Object.entries(params || {}).forEach(
					([key, value]) => (encounter[key] = value),
				);
				encounter.resourceType = 'Encounter';
				await encounter.save();

				resolve(encounter);
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.removeData = function (_id) {
		return new Promise(async (resolve, reject) => {
			try {
				const encounter = await this.findOne({_id});

				if (!encounter) {
					throw new Error('Encounter not found');
				}

				await encounter.remove();
				resolve(encounter);
			} catch (e) {
				reject(e);
			}
		});
	};

	return mongoose.model('Encounter', Schema);
};
