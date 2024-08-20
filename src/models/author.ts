import mongoose from "mongoose";
import Joi from "joi";

export const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

export const Author = mongoose.model('Author', authorSchema);

export function validateAuthor(author: any) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        bio: Joi.string().allow('', null),
        website: Joi.string().allow('', null)
    });
    return schema.validate(author).error;
}