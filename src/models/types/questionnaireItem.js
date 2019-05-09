const coding = require('./coding');
const answerValueSet = require('./answerValueSet');
const questionnaireItem = require('./questionnaireItem');
const questionnaireAnswerQuantity = require('./questionnaireAnswerQuantity');
const questionnaireAnswerReference = require('./questionnaireAnswerReference');

const mongoose = require('mongoose');

module.exports = {
  linkId: String,
  definition: String,
  code: [coding],
  prefix: String,
  text: String,
  type: {
    type: String,
    enum: [
      'group',
      'display',
      'boolean',
      'decimal',
      'integer',
      'date',
      'dateTime +',
    ],
  },
  enableWhen: [
    {
      question: String,
      operator: {
        type: String,
        enum: ['exists', '=', '!=', '>', '<', ' >=', '<='],
      },
      answerBoolean: Boolean,
      answerDecimal: mongoose.Decimal128,
      answerInteger: Number,
      answerDate: Date,
      answerDateTime: Date,
      answerTime: Date,
      answerString: String,
      answerCoding: coding,
      answerQuantity: questionnaireAnswerQuantity,
      answerReference: questionnaireAnswerReference,
    },
  ],
  required: Boolean,
  repeats: Boolean,
  readOnly: Boolean,
  maxLength: Number,
  answerValueSet: answerValueSet,
  answerOption: [
    {
      id: String,
      valueInteger: Number,
      valueDate: Date,
      valueTime: Date,
      valueString: String,
      valueCoding: coding,
      valueReference: questionnaireAnswerReference,
    },
  ],
  initial: [
    {
      id: String,
      valueInteger: Number,
      valueDate: Date,
      valueTime: Date,
      valueString: String,
      valueCoding: coding,
      valueReference: questionnaireAnswerReference,
    },
  ],
  item: [questionnaireItem],
};
