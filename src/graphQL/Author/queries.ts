import { Author } from "../../models/author";
import { GraphQLList, GraphQLID, GraphQLNonNull } from "graphql";
import { AuthorType } from "./type";
import { throwError } from "../../error_handler";

export const authorQueries = {
    author:  {
        type: AuthorType,
        args: {
            id: { type: GraphQLNonNull(GraphQLID) },
        },
        async resolve(parent: any, args: any) {
            const author = await Author.findById(args.id);
            if(author) return author;
            else throwError('NOT_FOUND', 'Author not found');
        }
    },
    authors: {
        type: new GraphQLList(AuthorType),
        resolve: async () => await Author.find()
    },
}