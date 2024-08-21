import { GraphQLNonNull, GraphQLString, GraphQLID } from "graphql";
import { BookType } from "./type";
import { Book } from "../../models/book";
import { throwError } from "../../error_handler";

export const bookMutations = {
    addBook: {
        type: BookType,
        args: {
            name: { type: GraphQLNonNull(GraphQLString) },
            authorID: { type: GraphQLNonNull(GraphQLID) }
        },
        async resolve(parent: any, args: any) {
            try {
                const book = new Book({
                    name: args.name,
                    authorID: args.authorID
                })
                await book.save();
                return book;
            }
            catch(error) {
                throwError('INTERNAL_SERVER_ERROR');
            }
        }
    },
    updateBook: {
        type: BookType,
        args: {
            id: { type: GraphQLNonNull(GraphQLString)},
            name: { type: GraphQLNonNull(GraphQLString) }
        },
        async resolve(parent: any, args: any) {
            try {
                let book = await Book.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name
                    }
                }, { new: true });
                if(book) book;
                else throwError('NOT_FOUND');
            }
            catch(error) {
                throwError('INTERNAL_SERVER_ERROR');
            }
        }
    },
    deleteBook: {
        type: BookType,
        args: {
            id: { type: GraphQLNonNull(GraphQLString)},
        },
        async resolve(parent: any, args: any) {
            try {
                let book = await Book.findByIdAndDelete(args.id);
                if(book) return book;
                else throwError('NOT_FOUND');
            }
            catch(error) {
                throwError('INTERNAL_SERVER_ERROR');
            }
        }
    }
}