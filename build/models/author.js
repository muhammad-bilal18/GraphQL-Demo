"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = exports.authorSchema = void 0;
exports.validateAuthor = validateAuthor;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
exports.authorSchema = new mongoose_1.default.Schema({
    name: String,
});
exports.Author = mongoose_1.default.model('Author', exports.authorSchema);
function validateAuthor(author) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).required(),
    });
    return schema.validate(author).error;
}
