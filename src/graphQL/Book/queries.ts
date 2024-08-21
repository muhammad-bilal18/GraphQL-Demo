import { Book } from "../../models/book";
import { GraphQLList, GraphQLID, GraphQLNonNull } from "graphql";
import { BookType } from "./type";
import { throwError } from "../../error_handler";

export const bookQueries = {
    book:  {
        type: BookType,
        args: {
            id: { type: GraphQLNonNull(GraphQLID) },
        },
        async resolve(parent: any, args: any) {
            const book = await Book.findById(args.id);
            if(book) return book;
            else throwError('NOT_FOUND', 'Book not found');
        }
    },
    books: {
        type: new GraphQLList(BookType),
        resolve: async () => await Book.find()
    }
}