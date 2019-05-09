const gender = require('./types/gender');
const contact = require('./types/contact');
const address = require('./types/address');
const identifier = require('./types/identifier');
const humanName = require('./types/humanName');
const attachment = require('./types/attachment');
const maritalStatus = require('./types/maritalStatus');
const contactPoint = require('./types/contactPoint');

module.exports = mongoose => {
  const Schema = new mongoose.Schema({
    resourceType: {
      type: String,
      required: true,
      enum: ['Patient'],
    },
    identifier: [identifier('Patient')],
    active: Boolean,
    name: [humanName],
    telecom: contactPoint,
    gender,
    birthDate: Date,
    deceased: {
      deceasedBoolean: Boolean,
      deceasedDateTime: Date,
    },
    maritalStatus,
    address: [address],
    multipleBirth: {
      multipleBirthBoolean: Boolean,
      multipleBirthInteger: Number,
    },
    contact,
    photo: attachment,
    communication: [{
      preferred: Boolean,
      communication: String,
    }],
    generalOrganization: [{
      type: 'ObjectId',
      ref: 'Organization',
    }],
    generalPractitioner: [{
      type: 'ObjectId',
      ref: 'Practitioner',
    }],
    generalPractitionerRole: [{
      type: 'ObjectId',
      ref: 'PractitionerRole',
    }],
    link: [{
      type: String,
      otherPatient: {
        type: 'ObjectId',
        ref: 'Patient',
      },
      otherRelatedPerson: {
        type: 'ObjectId',
        ref: 'RelatedPerson',
      },
    }],
    managingOrganization: {
      type: 'ObjectId',
      ref: 'Organization',
    },
  }, {
    timestamps: true,
  });

  const permitFields = [
    'identifier',
    'active',
    'name',
    'telecom',
    'gender',
    'birthDate',
    'deceased',
    'address',
    'contact',
    'photo',
    'link',
    'maritalStatus',
    'multipleBirth',
    'communication',
    'generalOrganization',
    'generalPractitioner',
    'generalPractitionerRole',
    'managingOrganization',
  ];

  Schema.statics.getAll = function (args) {
    return new Promise(async (resolve, reject) => {
      try {
        const { limit = 10, page = 1 } = args || {};
        const query = { limit: Math.abs(parseInt(limit, 10) || 10) };
        const currentPage = Math.abs((parseInt(page, 10) || 1) - 1);
        query.skip = query.limit * currentPage;
        const patients = await this.find({}, {}, { sort: { createdAt: 'desc' }, limit: query.limit, skip: query.skip });
        resolve(patients.map(resource => ({ resource })));
      } catch (e) {
        reject(e);
      }
    });
  };

  Schema.statics.getOne = function (params = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const patient = await this.findOne(params || {});

        if (!patient) {
          throw new Error('Patient not found');
        }

        resolve(patient);
      } catch (e) {
        reject(e);
      }
    });
  };

  Schema.statics.createData = function (params = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const permitParams = permitFields.reduce((obj, key) => [undefined, null].includes(params[key]) ? obj : Object.assign(obj, { [key]: params[key] }), {});
        permitParams.resourceType = 'Patient';
        resolve(await this.create(permitParams));
      } catch (e) {
        reject(e);
      }
    });
  };

  Schema.statics.updateData = function (_id, params = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const patient = await this.findOne({ _id });

        if (!patient) {
          throw new Error('Patient not found');
        }

        Object.entries(params || {}).forEach(([key, value]) => (patient[key] = value));
        patient.resourceType = 'Patient';
        await patient.save();

        resolve(patient);
      } catch (e) {
        reject(e);
      }
    });
  };

  Schema.statics.removeData = function (_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const patient = await this.findOne({ _id });

        if (!patient) {
          throw new Error('Patient not found');
        }

        await patient.remove();
        resolve(patient);
      } catch (e) {
        reject(e);
      }
    });
  };

  return mongoose.model('Patient', Schema);
};
