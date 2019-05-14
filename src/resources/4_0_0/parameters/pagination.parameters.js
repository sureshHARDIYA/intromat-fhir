const { GraphQLInt } = require('graphql');

/**
 * @name exports
 * @static
 * @summary Arguments for the pagination query
 */

module.exports = {
  limit: {
    type: GraphQLInt,
  },
  page: {
    type: GraphQLInt,
  },
};
