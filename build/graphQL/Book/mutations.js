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
exports.bookMutations = void 0;
const graphql_1 = require("graphql");
const type_1 = require("./type");
const book_1 = require("../../models/book");
const error_handler_1 = require("../../error_handler");
exports.bookMutations = {
    addBook: {
        type: type_1.BookType,
        args: {
            name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
            authorID: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const book = new book_1.Book({
                        name: args.name,
                        authorID: args.authorID
                    });
                    yield book.save();
                    return book;
                }
                catch (error) {
                    (0, error_handler_1.throwError)('INTERNAL_SERVER_ERROR');
                }
            });
        }
    },
    updateBook: {
        type: type_1.BookType,
        args: {
            id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
            name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) }
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let book = yield book_1.Book.findByIdAndUpdate(args.id, {
                        $set: {
                            name: args.name
                        }
                    }, { new: true });
                    if (book)
                        book;
                    else
                        (0, error_handler_1.throwError)('NOT_FOUND');
                }
                catch (error) {
                    (0, error_handler_1.throwError)('INTERNAL_SERVER_ERROR');
                }
            });
        }
    },
    deleteBook: {
        type: type_1.BookType,
        args: {
            id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let book = yield book_1.Book.findByIdAndDelete(args.id);
                    if (book)
                        return book;
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
