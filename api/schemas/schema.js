const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const mongoose = require('mongoose');

const UserQueries = require('../models/User/UserQueries');
// const {
//   UserQueries,
//   UserMutations,
//   UserType
// } = require('../models/User/UserQL.js');

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
//     addUser: UserMutations.addUser,
//   })
// });


let schema = new GraphQLSchema({
  query: RootQuery,
  // mutation: RootMutation
});

module.exports = schema;
