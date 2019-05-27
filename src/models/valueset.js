const contact = require('./types/contact');
const identifier = require('./types/identifier');
const domainResource = require('./types/domainResource');
const valueSetExpansion = require('./types/valueSetExpansion');
const answerValueSetInclude = require('./types/answerValueSetInclude');

module.exports = mongoose => {
  const Schema = new mongoose.Schema(
    Object.assign(domainResource, {
      resourceType: {
        type: String,
        required: true,
        enum: ['ValueSet'],
      },
      url: String,
      identifier: [identifier('ValueSet')],
      version: String,
      name: String,
      title: String,
      status: {
        type: String,
        enum: ['draft', 'active', 'retired', 'unknown'],
      },
      experimental: Boolean,
      date: Date,
      publisher: String,
      contact: [contact],
      description: String,
      immutable: Boolean,
      purpose: String,
      copyright: String,
      compose: {
        lockedDate: Date,
        inactive: Boolean,
        include: [answerValueSetInclude],
        exclude: [answerValueSetInclude],
      },
      expansion: [valueSetExpansion],
      creation: Date,
    }),
    {
      timestamps: true,
    },
  );

  const permitFields = [
    'url',
    'identifier',
    'version',
    'name',
    'title',
    'status',
    'experimental',
    'date',
    'publisher',
    'contact',
    'description',
    'immutable',
    'purpose',
    'copyright',
    'compose',
    'expansion',
    'creation',
  ];

  Schema.set('toJSON', { virtuals: true });

  Schema.statics.getAll = function(args) {
    return new Promise(async (resolve, reject) => {
      try {
        const { limit = 100, page = 1 } = args || {};
        const query = { limit: Math.abs(parseInt(limit, 10) || 100) };
        const currentPage = Math.abs((parseInt(page, 10) || 1) - 1);
        const total = await this.count();
        query.skip = query.limit * currentPage;
        const valuesets = await this.find(
          {},
          {},
          { sort: { createdAt: 'desc' }, limit: query.limit, skip: query.skip },
        );

        resolve({
          total,
          pageSize: limit,
          page: currentPage + 1,
          totalPage: Math.ceil(total / limit),
          entry: valuesets.map(resource => ({ resource })),
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  Schema.statics.getOne = function(params = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const valueset = await this.findOne(params || {});

        if (!valueset) {
          throw new Error('Valueset not found');
        }

        resolve(valueset);
      } catch (e) {
        reject(e);
      }
    });
  };

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
        permitParams.resourceType = 'ValueSet';
        resolve(await this.create(permitParams));
      } catch (e) {
        reject(e);
      }
    });
  };

  Schema.statics.updateData = function(_id, params = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const valueset = await this.findOne({ _id });

        if (!valueset) {
          throw new Error('Valueset not found');
        }

        Object.entries(params || {}).forEach(
          ([key, value]) => (valueset[key] = value),
        );
        valueset.resourceType = 'ValueSet';
        await valueset.save();

        resolve(valueset);
      } catch (e) {
        reject(e);
      }
    });
  };

  Schema.statics.removeData = function(_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const valueset = await this.findOne({ _id });

        if (!valueset) {
          throw new Error('Valueset not found');
        }

        await valueset.remove();
        resolve(valueset);
      } catch (e) {
        reject(e);
      }
    });
  };

  return mongoose.model('Valueset', Schema);
};
