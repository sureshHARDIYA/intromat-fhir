const period = require('./types/period');
const identifier = require('./types/identifier');
const attachment = require('./types/attachment');
const domainResource = require('./types/domainResource');
const codeableConcept = require('./types/codeableConcept');

module.exports = mongoose => {
	const Schema = new mongoose.Schema(
		Object.assign(domainResource, {
				resourceType: {
					type: String,
					required: true,
					enum: ['Media'],
				},
				identifier: [identifier('Media')],
				serviceRequest: [
					{
						type: mongoose.Schema.ObjectId,
						ref: 'ServiceRequest',
					}
				],
				carePlan: [
					{
						type: mongoose.Schema.ObjectId,
						ref: 'CarePlan'
					}
				],
				status: String,
				type: codeableConcept,
				modality: codeableConcept,
				view: codeableConcept,
				patient: {
					type: mongoose.Schema.ObjectId,
					ref: 'Patient'
				},
				practitioner: {
					type: mongoose.Schema.ObjectId,
					ref: 'Practitioner'
				},
				practitionerRole: {
					type: mongoose.Schema.ObjectId,
					ref: 'PractitionerRole'
				},
				group: {
					type: mongoose.Schema.ObjectId,
					ref: 'Group'
				},
				device: {
					type: mongoose.Schema.ObjectId,
					ref: 'Device'
				},
				specimen: {
					type: mongoose.Schema.ObjectId,
					ref: 'Specimen'
				},
				location: {
					type: mongoose.Schema.ObjectId,
					ref: 'Location'
				},
				encounter: {
					type: mongoose.Schema.ObjectId,
					ref: 'Encounter'
				},
				created: {
					createdDateTime: String,
					createdPeriod: period
				},
				issued: String,
				operatorPractitioner: {
					type: mongoose.Schema.ObjectId,
					ref: 'Practitioner'
				},
				organization: {
					type: mongoose.Schema.ObjectId,
					ref: 'Organization'
				},
				relatedPerson: {
					type: mongoose.Schema.ObjectId,
					ref: 'RelatedPerson'
				},
				careTeam: {
					type: mongoose.Schema.ObjectId,
					ref: 'CareTeam'
				},
				reasonCodes: [codeableConcept],
				bodySite: codeableConcept,
				deviceName: String,
				deviceMetric: {
					type: mongoose.Schema.ObjectId,
					ref: 'DeviceMetric'
				},
				/*height: Number,
				width: Number,
				frames: Number,*/
				duration: Number,
				content: attachment,
				note: {
					author: {
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
					},
					time: Date,
					text: String,
				},
			}
		));

	Schema.virtual('basedOn').get( function() {
			Object.assign(
				[],
				this.serviceRequest,
				this.carePlan
			);
		}
	);

	Schema.virtual('subject').get( function() {
			Object.assign(
				[],
				this.patient,
				this.practitioner,
				this.practitionerRole,
				this.group,
				this.device,
				this.specimen,
				this.location
			);
		}
	);

	Schema.virtual('operator').get( function() {
			Object.assign(
				[],
				this.practitioner,
				this.practitionerRole,
				this.organization,
				this.careTeam,
				this.patient,
				this.device,
				this.relatedPerson
			);
		}
	);

	const permitFields = [
		'identifier', 'basedOn', 'serviceRequest', 'carePlan', 'partOf', 'status', 'status',
		'type', 'modality', 'view', 'subject', 'patient', 'practitioner', 'practitionerRole',
		'group', 'device', 'specimen', 'location', 'encounter', 'created', 'createdDateTime',
		'createdPeriod', 'issued', 'operator', 'organization', 'careTeam', 'relatedPerson',
		'reasonCode', 'bodySite', 'deviceName', 'height', 'width', 'frames', 'duration',
		'content', 'note'
	];

	Schema.statics.getAll = function(args) {
		return new Promise( async (resolve, reject) => {
			try {
				const { limit = 100, page = 1 } = args || {};
				const query = { limit: Math.abs(parseInt(limit, 10) || 100) };
				const currentPage = Math.abs((parseInt(page, 10) || 1) - 1);
				const total = await this.count();
				query.skip = query.limit * currentPage;

				const media = await this.find(
					{},
					{},
					{ sort: { createdAt: 'desc' }, limit: query.limit, skip: query.skip },
				);

				resolve({
					total,
					pageSize: limit,
					page: currentPage + 1,
					totalPage: Math.ceil(total / limit),
					entry: media.map(resource => ({ resource })),
				});
			} catch (e){
				reject(e);
			}
		});
	};

	Schema.statics.getOne = function(params = {}){
		return new Promise( async (resolve, reject) => {
				try {
					const media = await this.findOne(params || {});

					if (!media){
						throw new Error('Media not found');
					}

					resolve(media);
				} catch (e){
					reject(e);
				}
			}
		);};

	Schema.statics.createData = function(params = {}) {
		return new Promise(async (resolve, reject) => {
			try {
				const permitParams = permitFields.reduce(
					(obj, key) =>
						[undefined, null].includes(params[key])
							? obj
							: Object.assign(obj, { [key]: params[key] }),
					{},
				);
				permitParams.resourceType = 'Media';
				resolve(await this.create(permitParams));
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.updateData = function(_id, params = {}) {
		return new Promise(async (resolve, reject) => {
			try {
				const media = await this.findOne({ _id });

				if (!media) {
					throw new Error('Media not found');
				}

				Object.entries(params || {}).forEach(
					([key, value]) => (media[key] = value),
				);
				media.resourceType = 'Media';
				await media.save();

				resolve(media);
			} catch (e) {
				reject(e);
			}
		});
	};

	Schema.statics.removeData = function(_id) {
		return new Promise(async (resolve, reject) => {
			try {
				const media = await this.findOne({ _id });

				if (!media) {
					throw new Error('Media not found');
				}

				await media.remove();
				resolve(media);
			} catch (e) {
				reject(e);
			}
		});
	};

	return mongoose.model('Media', Schema);
};
