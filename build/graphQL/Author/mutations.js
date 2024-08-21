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
exports.authorMutations = void 0;
const graphql_1 = require("graphql");
const type_1 = require("./type");
const author_1 = require("../../models/author");
const error_handler_1 = require("../../error_handler");
exports.authorMutations = {
    addAuthor: {
        type: type_1.AuthorType,
        args: {
            name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const author = new author_1.Author({
                        name: args.name
                    });
                    yield author.save();
                    return author;
                }
                catch (error) {
                    (0, error_handler_1.throwError)('INTERNAL_SERVER_ERROR');
                }
            });
        }
    },
    updateAuthor: {
        type: type_1.AuthorType,
        args: {
            id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
            name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let author = yield author_1.Author.findByIdAndUpdate(args.id, {
                        $set: {
                            name: args.name
                        }
                    }, { new: true });
                    if (author)
                        author;
                    else
                        (0, error_handler_1.throwError)('NOT_FOUND');
                }
                catch (error) {
                    (0, error_handler_1.throwError)('INTERNAL_SERVER_ERROR');
                }
            });
        }
    },
    deleteAuther: {
        type: type_1.AuthorType,
        args: {
            id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let author = yield author_1.Author.findByIdAndDelete(args.id);
                    if (author)
                        return author;
                    else
                        (0, error_handler_1.throwError)('NOT_FOUND');
                }
                catch (error) {
                    (0, error_handler_1.throwError)('INTERNAL_SERVER_ERROR');
                }
            });
        }
    }
};
