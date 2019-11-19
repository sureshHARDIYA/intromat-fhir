const period = require('./types/period');
const action = require('./types/auditEventAction');
const outcome = require('./types/auditEventOutcome');
const domainResource = require('./types/domainResource');
const codeableConcept = require('./types/codeableConcept');
const auditEventSourceType = require('./types/auditEventSourceType');
const auditEventAgentNetworkType = require('./types/auditEventAgentNetworkType');

module.exports = mongoose => {
	const Schema = new mongoose.Schema(
		Object.assign(domainResource, {
			resourceType: {
				type: String,
				required: true,
				enum: ['auditEvent'],
			},
			type: codeableConcept,
			subtype: [codeableConcept],
			action,
			period,
			recorded: Date, //should be instant
			outcome,
			outcomeDesc: String,
			purposeOfEvent: [codeableConcept],
			agent: [
				{
					type: codeableConcept,
					role: [codeableConcept],
					whoPractitionerRole: {
						type: mongoose.Schema.ObjectId,
						ref: 'PractitionerRole',
					},
					whoPractitioner: {
						type: mongoose.Schema.ObjectId,
						ref: 'Practitioner',
					},
					whoOrganization: {
						type: mongoose.Schema.ObjectId,
						ref: 'Organization',
					},
					whoDevice: {
						type: mongoose.Schema.ObjectId,
						ref: 'Device',
					},
					whoPatient: {
						type: mongoose.Schema.ObjectId,
						ref: 'Patient',
					},
					whoRelatedPerson: {
						type: mongoose.Schema.ObjectId,
						ref: 'RelatedPerson',
					},
					altId: String,
					name: String,
					requestor: Boolean,
					location: {
						type: 'ObjectId',
						ref: 'Location',
					},
					policy: [String],
					media: codeableConcept,
					network: {
						address: String,
						type: auditEventAgentNetworkType,
					},
					purposeOfUse: [codeableConcept],
				},
			],
			source: {
				site: String,
				observerPractitionerRole: {
					type: mongoose.Schema.ObjectId,
					ref: 'PractitionerRole',
				},
				observerPractitioner: {
					type: mongoose.Schema.ObjectId,
					ref: 'Practitioner',
				},
				observerOrganization: {
					type: mongoose.Schema.ObjectId,
					ref: 'Organization',
				},
				observerDevice: {
					type: mongoose.Schema.ObjectId,
					ref: 'Device',
				},
				observerPatient: {
					type: mongoose.Schema.ObjectId,
					ref: 'Patient',
				},
				observerRelatedPerson: {
					type: mongoose.Schema.ObjectId,
					ref: 'RelatedPerson',
				},
				type: auditEventSourceType,
			},
			entity: [
				{
					what: {
						type: 'ObjectId',
						ref: 'Any',
					},
					type: codeableConcept,
					role: codeableConcept,
					lifecycle: codeableConcept,
					securityLabel: [codeableConcept],
					name: String,
					description: String,
					query: String,
					detail: [
						{
							type: String,
							value: {
								valueString: String,
								valueBase64Binary: String,
							},
						},
					],
				},
			],

		}),
		{
			timestamps: true,
		},
	);

	const permitFields = [
		'type',
		'subtype',
		'action',
		'period',
		'recorded',
		'outcome',
		'outcomeDesc',
		'purposeOfEvent',
		'agent',
		'source',
		'entity',
	];

	Schema.statics.getAll = async function(args) {
			try {
				const { limit = 100, page = 1 } = args || {};
				const query = { limit: Math.abs(parseInt(limit, 10) || 100) };
				const currentPage = Math.abs((parseInt(page, 10) || 1) - 1);
				const total = await this.count();
				query.skip = query.limit * currentPage;
				const auditEvents = await this.find(
					{},
					{},
					{ sort: { createdAt: 'desc' }, limit: query.limit, skip: query.skip },
				);

				return ({
					total,
					pageSize: limit,
					page: currentPage + 1,
					totalPage: Math.ceil(total / limit),
					entry: auditEvents.map(resource => ({ resource })),
				});
			} catch (e) {
				console.log(e);
			}
	};

	Schema.statics.getOne = async function(params = {}) {
			try {
				const auditEvent = await this.findOne(params || {});

				if (!auditEvent) {
					throw new Error('AuditEvent not found');
				}

				return (auditEvent);
			} catch (e) {
				console.log(e);
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
				permitParams.resourceType = 'AuditEvent';
				return (await this.create(permitParams));
			} catch (e) {
				console.log(e);
			}
	};

	Schema.statics.updateData = async function(_id, params = {}) {
			try {
				const auditEvent = await this.findOne({ _id });

				if (!auditEvent) {
					throw new Error('AuditEvent not found');
				}

				Object.entries(params || {}).forEach(
					([key, value]) => (auditEvent[key] = value),
				);
				auditEvent.resourceType = 'AuditEvent';
				await auditEvent.save();

				return (auditEvent);
			} catch (e) {
				console.log(e);
			}
	};

	Schema.statics.removeData = async function(_id) {
			try {
				const auditEvent = await this.findOne({ _id });

				if (!auditEvent) {
					throw new Error('AuditEvent not found');
				}

				await auditEvent.remove();
				return (auditEvent);
			} catch (e) {
				console.log(e);
			}
	};

	return mongoose.model('AuditEvent', Schema);

};
