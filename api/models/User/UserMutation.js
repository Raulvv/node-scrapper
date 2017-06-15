const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');

const UserType =require('./UserType.js');
const { User, TwitterUser, InstagramUser} = require('./User.js');

module.exports = {
  scrapUser: {
    type: UserType,
    args: {
      username: {
        type: new GraphQLNonNull(GraphQLString)
      },
      rs: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: User.addUser
  }
};
