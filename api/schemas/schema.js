const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const mongoose = require('mongoose');

const UserQueries  = require('../models/User/UserQueries');
// const UserMutation = require('../models/User/UserMutation')

let RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: UserQueries.users,
    user:  UserQueries.user
  })
});


// let RootMutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: () => ({
//     addUser: UserMutation.addUser,
//   })
// });


let schema = new GraphQLSchema({
  query: RootQuery,
  // mutation: RootMutation
});

module.exports = schema;
