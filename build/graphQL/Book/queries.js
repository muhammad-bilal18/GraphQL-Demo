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
exports.bookQueries = void 0;
const book_1 = require("../../models/book");
const graphql_1 = require("graphql");
const type_1 = require("./type");
const error_handler_1 = require("../../error_handler");
exports.bookQueries = {
    book: {
        type: type_1.BookType,
        args: {
            id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const book = yield book_1.Book.findById(args.id);
                if (book)
                    return book;
                else
                    (0, error_handler_1.throwError)('NOT_FOUND', 'Book not found');
            });
        }
    },
    books: {
        type: new graphql_1.GraphQLList(type_1.BookType),
        resolve: () => __awaiter(void 0, void 0, void 0, function* () { return yield book_1.Book.find(); })
    }
};
