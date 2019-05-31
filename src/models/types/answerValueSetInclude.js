const coding = require('./coding');
const extension = require('./extension');

module.exports = {
  system: String,
  version: String,
  concept: [
    {
      code: String,
      display: String,
      extension: [extension],
      designation: [
        {
          language: String,
          use: coding,
          value: String,
        },
      ],
    },
  ],
  filter: [
    {
      property: String,
      op: {
        type: String,
        enum: [
          '=',
          'is-a',
          'descendent-of',
          'is-not-a',
          'regex',
          'in',
          'not-in',
          'generalizes',
          'exists',
        ],
      },
      value: String,
    },
  ],
  valueSet: {
    type: 'ObjectId',
    ref: 'ValueSet',
  },
};
