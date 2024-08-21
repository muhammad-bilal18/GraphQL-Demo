import { GraphQLNonNull, GraphQLString } from "graphql";
import { AuthorType } from "./type";
import { Author, validateAuthor } from "../../models/author";
import { throwError } from "../../error_handler";

export const authorMutations = {
    addAuthor: {
        type: AuthorType,
        args: {
            name: { type: GraphQLNonNull(GraphQLString) }
        },
        async resolve(parent: any, args: any) {
            try {
                const author = new Author({
                    name: args.name
                });
                await author.save();
                return author;
            }
            catch (error) {
                throwError('INTERNAL_SERVER_ERROR');
            }
        }
    },
    updateAuthor: {
        type: AuthorType,
        args: {
            id: { type: GraphQLNonNull(GraphQLString)},
            name: { type: GraphQLNonNull(GraphQLString) }
        },
        async resolve(parent: any, args: any) {
            try {
                let author = await Author.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name
                    }
                }, { new: true });
                if(author) author;
                else throwError('NOT_FOUND');
            }
            catch (error) {
                throwError('INTERNAL_SERVER_ERROR');
            }
        }
    },
    deleteAuther: {
        type: AuthorType,
        args: {
            id: { type: GraphQLNonNull(GraphQLString)},
        },
        async resolve(parent: any, args: any) {
            try {
                let author = await Author.findByIdAndDelete(args.id);
                if(author) return author;
                else throwError('NOT_FOUND');
            }
            catch (error) {
                throwError('INTERNAL_SERVER_ERROR');
            }
        }
    }
}