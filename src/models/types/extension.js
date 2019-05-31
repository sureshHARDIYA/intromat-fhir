const coding = require('./coding');
const extension = require('./extension');

module.exports = {
  id: String,
  extension: [extension],
  url: {
    type: String,
    required: true,
  },
  valueBoolean: {
    type: Boolean,
  },
  valueDecimal: {
    type: Number,
  },
  valueCode: {
    type: [coding],
  },
};
