module.exports = {
  id: String,
  use: String,
  type: String,
  system: String,
  value: String,
  assigner: {
    type: 'ObjectId',
    ref: 'Organization',
  },
};
