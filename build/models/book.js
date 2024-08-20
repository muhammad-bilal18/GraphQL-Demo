"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
exports.validateBook = validateBook;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.Book = mongoose_1.default.model('Course', new mongoose_1.default.Schema({
    name: String,
    authorID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));
function validateBook(book) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(4).required(),
        authorID: joi_1.default.string().length(24).required()
    });
    return schema.validate(book).error;
}
