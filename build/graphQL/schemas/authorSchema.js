"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorType = void 0;
const graphql_1 = require("graphql");
const bookSchema_1 = require("./bookSchema");
const book_1 = require("../../models/book");
exports.AuthorType = new graphql_1.GraphQLObjectType({
    name: 'AuthorType',
    fields: () => ({
        _id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
        name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        books: {
            type: (0, graphql_1.GraphQLList)(bookSchema_1.BookType),
            resolve: (author) => book_1.Book.find({ authorID: author._id })
        }
    })
});
