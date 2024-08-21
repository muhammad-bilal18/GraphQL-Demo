"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const Author_1 = require("./Author");
const Book_1 = require("./Book");
const RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: Object.assign(Object.assign({}, Author_1.authorQueries), Book_1.bookQueries)
});
const mutations = new graphql_1.GraphQLObjectType({
    name: 'mutation',
    fields: Object.assign(Object.assign({}, Author_1.authorMutations), Book_1.bookMutations)
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQueryType,
    mutation: mutations
});
