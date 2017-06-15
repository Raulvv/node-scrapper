const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} = require('graphql');

const GraphQLDate = require('graphql-date');

const User = require('./User');

module.exports = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    username: {
      type: GraphQLString
    },
    followers: {
      type: GraphQLInt
    },
    following: {
      type: GraphQLInt
    },
    profileImagePath: {
      type: GraphQLString
    },
    bio: {
      type: GraphQLString
    },
    rs: {
      type: GraphQLString
    },
    totalTweets: {
      type: GraphQLInt
    },
    totalPosts: {
      type: GraphQLInt
    },
    createdAt: {
      type: GraphQLDate
    }
  })
});
