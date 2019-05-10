const identifier = require('./identifier');
const contact = require('./contact');
const answerValueSetInclude = require('./answerValueSetInclude');
const valueSetExpansion = require('./valueSetExpansion');

module.exports = {
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
};
