const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = require('graphql');

const { User } = require('./User');
const UserType = require('./UserType');

module.exports = {
  users: {
    type: new GraphQLList(UserType),
    resolve: User.getListOfUsers
  },
  user: {
    type: UserType,
    args: {
      username: {
        type: GraphQLString
      },
      rs: {
        type: GraphQLString
      }
    },
    resolve: User.addUser
  }
};
