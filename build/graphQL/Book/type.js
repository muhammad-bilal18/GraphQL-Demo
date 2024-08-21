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
exports.BookType = void 0;
const graphql_1 = require("graphql");
const type_1 = require("../Author/type");
const author_1 = require("../../models/author");
exports.BookType = new graphql_1.GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        _id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
        name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        authorID: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
        author: {
            type: type_1.AuthorType,
            resolve: (book) => __awaiter(void 0, void 0, void 0, function* () { return yield author_1.Author.findById(book.authorID); })
        }
    })
});
