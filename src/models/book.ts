import Joi from "joi";
import mongoose from "mongoose";
import { authorSchema } from "./author";

export const Book = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

export function validateBook(book: any) {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        authorID: Joi.string().length(24).required()
    });
    return schema.validate(book).error;
}