"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const graphql_2 = require("graphql");
const bookSchema_1 = require("./schemas/bookSchema");
const authorSchema_1 = require("./schemas/authorSchema");
const author_1 = require("../models/author");
const book_1 = require("../models/book");
const RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: {
        book: {
            type: bookSchema_1.BookType,
            args: {
                id: { type: (0, graphql_2.GraphQLNonNull)(graphql_2.GraphQLID) },
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () { return book_1.Book.findById(args.id); })
        },
        author: {
            type: authorSchema_1.AuthorType,
            args: {
                id: { type: (0, graphql_2.GraphQLNonNull)(graphql_2.GraphQLID) },
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () { return author_1.Author.findById(args.id); })
        },
        authors: {
            type: new graphql_2.GraphQLList(authorSchema_1.AuthorType),
            resolve: () => __awaiter(void 0, void 0, void 0, function* () { return yield author_1.Author.find(); })
        },
        books: {
            type: new graphql_2.GraphQLList(bookSchema_1.BookType),
            resolve: () => __awaiter(void 0, void 0, void 0, function* () { return yield book_1.Book.find(); })
        }
    }
});
const mutation = new graphql_1.GraphQLObjectType({
    name: 'mutation',
    fields: {
        addAuthor: {
            type: authorSchema_1.AuthorType,
            args: {
                name: { type: (0, graphql_2.GraphQLNonNull)(graphql_2.GraphQLString) }
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const author = new author_1.Author({
                        name: args.name
                    });
                    yield author.save();
                    return author;
                });
            }
        },
        addBook: {
            type: bookSchema_1.BookType,
            args: {
                name: { type: (0, graphql_2.GraphQLNonNull)(graphql_2.GraphQLString) },
                authorID: { type: (0, graphql_2.GraphQLNonNull)(graphql_2.GraphQLID) }
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const book = new book_1.Book({
                        name: args.name,
                        authorID: args.authorID
                    });
                    yield book.save();
                    return book;
                });
            }
        }
    }
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQueryType,
    mutation: mutation
});
