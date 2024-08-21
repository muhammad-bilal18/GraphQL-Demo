import mongoose from "mongoose";
import Joi from "joi";

export const authorSchema = new mongoose.Schema({
    name: String,
});

export const Author = mongoose.model('Author', authorSchema);

export function validateAuthor(author: any) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });
    return schema.validate(author).error;
}